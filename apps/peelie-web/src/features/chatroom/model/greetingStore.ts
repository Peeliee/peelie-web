import { toast } from 'sonner';

import type { ChatBubble, LocalTurn } from '@/entities/chatroom';

import { streamGreeting } from '../api/streamGreeting';

interface GreetingEntry {
  turn: LocalTurn | null;
  pending: boolean;
  done: boolean;
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
    entry = { turn: null, pending: false, done: false };
    entries.set(chatRoomId, entry);
  }
  return entry;
}

export function startGreeting(chatRoomId: string): void {
  const entry = getOrCreate(chatRoomId);
  if (entry.done || entry.pending) return;

  entries.set(chatRoomId, { ...entry, pending: true });
  notify();

  const acc = { bubbles: [] as ChatBubble[], suggestions: [] as string[] };
  let completed: LocalTurn | null = null;
  let skipped = false;
  let aborted = false;

  const controller = new AbortController();
  controller.signal.addEventListener('abort', () => {
    aborted = true;
  });

  streamGreeting(
    chatRoomId,
    (event) => {
      switch (event.type) {
        case 'skip':
          skipped = true;
          return;
        case 'meta':
          return;
        case 'bubble':
          acc.bubbles.push({ text: event.text, delayMs: event.delayMs });
          return;
        case 'suggestions':
          acc.suggestions = event.suggestions;
          return;
        case 'done':
          completed = {
            kind: 'greeting',
            bubbles: acc.bubbles,
            suggestions: acc.suggestions,
            completedAt: new Date().toISOString(),
          };
          return;
        case 'error':
          toast.error(event.message);
          return;
      }
    },
    controller.signal,
  )
    .catch((e) => {
      if (aborted) return;
      toast.error(e instanceof Error ? e.message : '인사 로딩 실패');
    })
    .finally(() => {
      if (aborted) return;
      const current = getOrCreate(chatRoomId);
      entries.set(chatRoomId, {
        ...current,
        pending: false,
        done: true,
        turn: !skipped && completed ? completed : current.turn,
      });
      notify();
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
