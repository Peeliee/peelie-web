import type { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { chatroomQueries } from '@/entities/chatroom';
import type { ChatBubble, LocalTurn } from '@/entities/chatroom';

import { patchChatListPreview } from '@/entities/chatroom';

import { streamGreeting } from '../api/streamGreeting';

const BUBBLE_RELEASE_GAP_MS = 3000;
const SUGGESTIONS_RELEASE_GAP_MS = 2000;

interface GreetingEntry {
  turn: LocalTurn | null;
  pending: boolean;
  done: boolean;
  queue: ChatBubble[];
  pendingSuggestions: string[] | null;
  lastReleaseAt: number | null;
  scheduleTimer: ReturnType<typeof setTimeout> | null;
  streamDone: boolean;
  aborted: boolean;
  skipped: boolean;
  queryClient: QueryClient | null;
}

const entries = new Map<string, GreetingEntry>();
const listeners = new Set<() => void>();
let snapshot: ReadonlyMap<string, GreetingEntry> = new Map();

function notify() {
  snapshot = new Map(entries);
  listeners.forEach((l) => l());
}

function getOrCreate(chatRoomId: string): GreetingEntry {
  let entry = entries.get(chatRoomId);
  if (!entry) {
    entry = {
      turn: null,
      pending: false,
      done: false,
      queue: [],
      pendingSuggestions: null,
      lastReleaseAt: null,
      scheduleTimer: null,
      streamDone: false,
      aborted: false,
      skipped: false,
      queryClient: null,
    };
    entries.set(chatRoomId, entry);
  }
  return entry;
}

function ensureTurn(entry: GreetingEntry): LocalTurn {
  if (entry.turn) return entry.turn;
  return {
    kind: 'greeting',
    bubbles: [],
    suggestions: [],
    completedAt: new Date().toISOString(),
  };
}

function scheduleRelease(chatRoomId: string): void {
  const entry = entries.get(chatRoomId);
  if (!entry || entry.aborted || entry.scheduleTimer) return;

  const hasBubble = entry.queue.length > 0;
  const hasSuggestions = entry.pendingSuggestions !== null;

  if (!hasBubble && !hasSuggestions) {
    if (entry.streamDone) finalize(chatRoomId);
    return;
  }

  let nextDelay = 0;
  if (entry.lastReleaseAt !== null) {
    const gapMs = hasBubble
      ? Math.max(entry.queue[0].delayMs, BUBBLE_RELEASE_GAP_MS)
      : SUGGESTIONS_RELEASE_GAP_MS;
    nextDelay = Math.max(0, entry.lastReleaseAt + gapMs - Date.now());
  }

  const timer = setTimeout(() => {
    const e = entries.get(chatRoomId);
    if (!e) return;
    entries.set(chatRoomId, { ...e, scheduleTimer: null });
    releaseNext(chatRoomId);
  }, nextDelay);

  entries.set(chatRoomId, { ...entry, scheduleTimer: timer });
}

function releaseNext(chatRoomId: string): void {
  const entry = entries.get(chatRoomId);
  if (!entry || entry.aborted) return;

  if (entry.queue.length > 0) {
    const [bubble, ...rest] = entry.queue;
    const baseTurn = ensureTurn(entry);
    entries.set(chatRoomId, {
      ...entry,
      queue: rest,
      turn: { ...baseTurn, bubbles: [...baseTurn.bubbles, bubble] },
      lastReleaseAt: Date.now(),
    });
    notify();
    if (entry.queryClient) {
      patchChatListPreview(entry.queryClient, chatRoomId, bubble.text);
    }
    scheduleRelease(chatRoomId);
    return;
  }

  if (entry.pendingSuggestions !== null) {
    const suggestions = entry.pendingSuggestions;
    const baseTurn = ensureTurn(entry);
    entries.set(chatRoomId, {
      ...entry,
      turn: { ...baseTurn, suggestions },
      pendingSuggestions: null,
      lastReleaseAt: Date.now(),
    });
    notify();
    scheduleRelease(chatRoomId);
    return;
  }

  if (entry.streamDone) {
    finalize(chatRoomId);
  }
}

function finalize(chatRoomId: string): void {
  const entry = entries.get(chatRoomId);
  if (!entry) return;

  const qc = entry.queryClient;
  const hadTurn = entry.turn !== null;

  entries.set(chatRoomId, { ...entry, pending: false, done: true, queryClient: null });
  notify();

  if (qc && hadTurn) {
    qc.invalidateQueries({ queryKey: chatroomQueries.chatList.queryKey });
  }
}

export function startGreeting(chatRoomId: string, queryClient: QueryClient): void {
  const entry = getOrCreate(chatRoomId);
  if (entry.done || entry.pending) return;

  entries.set(chatRoomId, { ...entry, pending: true, queryClient });
  notify();

  const controller = new AbortController();
  controller.signal.addEventListener('abort', () => {
    const e = entries.get(chatRoomId);
    if (!e) return;
    if (e.scheduleTimer) clearTimeout(e.scheduleTimer);
    entries.set(chatRoomId, { ...e, aborted: true, scheduleTimer: null });
  });

  streamGreeting(
    chatRoomId,
    (event) => {
      const e = entries.get(chatRoomId);
      if (!e || e.aborted) return;

      switch (event.type) {
        case 'skip':
          if (e.scheduleTimer) clearTimeout(e.scheduleTimer);
          entries.set(chatRoomId, {
            ...e,
            skipped: true,
            queue: [],
            pendingSuggestions: null,
            turn: null,
            scheduleTimer: null,
          });
          return;
        case 'meta':
          return;
        case 'bubble':
          entries.set(chatRoomId, {
            ...e,
            queue: [...e.queue, { text: event.text, delayMs: event.delayMs }],
          });
          scheduleRelease(chatRoomId);
          return;
        case 'suggestions':
          entries.set(chatRoomId, { ...e, pendingSuggestions: event.suggestions });
          scheduleRelease(chatRoomId);
          return;
        case 'done':
          entries.set(chatRoomId, { ...e, streamDone: true });
          scheduleRelease(chatRoomId);
          return;
        case 'error':
          toast.error(event.message);
          return;
      }
    },
    controller.signal,
  )
    .catch((err) => {
      const e = entries.get(chatRoomId);
      if (!e || e.aborted) return;
      toast.error(err instanceof Error ? err.message : '인사 로딩 실패');
    })
    .finally(() => {
      const e = entries.get(chatRoomId);
      if (!e || e.aborted) return;
      if (e.skipped) {
        finalize(chatRoomId);
        return;
      }
      if (!e.streamDone) {
        entries.set(chatRoomId, { ...e, streamDone: true });
        scheduleRelease(chatRoomId);
      }
    });
}

export const greetingStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): ReadonlyMap<string, GreetingEntry> {
    return snapshot;
  },
};
