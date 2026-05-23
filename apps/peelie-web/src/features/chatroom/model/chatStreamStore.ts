import type { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { chatroomQueries } from '@/entities/chatroom';
import type { ChatBubble, LocalTurn } from '@/entities/chatroom';

import { streamChatMessage } from '../api/streamChatMessage';

const BUBBLE_RELEASE_GAP = 3000;

type State =
  | { status: 'idle' }
  | { status: 'sending'; userMessage: string }
  | {
      status: 'streaming';
      chatRoomId: string;
      userMessage: string;
      bubbles: ChatBubble[];
      suggestions: string[];
    }
  | { status: 'error'; message: string };

type Action =
  | { type: 'SEND'; userMessage: string }
  | { type: 'META'; chatRoomId: string }
  | { type: 'APPEND_BUBBLE'; bubble: ChatBubble }
  | { type: 'SET_SUGGESTIONS'; suggestions: string[] }
  | { type: 'ERROR'; message: string };

export type SendStreamState = State;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SEND':
      return { status: 'sending', userMessage: action.userMessage };
    case 'META':
      if (state.status !== 'sending') return state;
      return {
        status: 'streaming',
        chatRoomId: action.chatRoomId,
        userMessage: state.userMessage,
        bubbles: [],
        suggestions: [],
      };
    case 'APPEND_BUBBLE':
      if (state.status !== 'streaming') return state;
      return { ...state, bubbles: [...state.bubbles, action.bubble] };
    case 'SET_SUGGESTIONS':
      if (state.status !== 'streaming') return state;
      return { ...state, suggestions: action.suggestions };
    case 'ERROR':
      return { status: 'error', message: action.message };
    default:
      return state;
  }
}

interface StreamEntry {
  state: State;
  history: LocalTurn[];
  queue: ChatBubble[];
  pendingSuggestions: string[] | null;
  lastReleaseAt: number | null;
  scheduleTimer: ReturnType<typeof setTimeout> | null;
  streamDone: boolean;
  completed: LocalTurn | null;
  queryClient: QueryClient | null;
}

const entries = new Map<string, StreamEntry>();
const controllers = new Map<string, AbortController>();
const listeners = new Set<() => void>();
let snapshot: ReadonlyMap<string, StreamEntry> = new Map();

function notify() {
  snapshot = new Map(entries);
  listeners.forEach((l) => l());
}

function emptyStreamState(): Omit<StreamEntry, 'state' | 'history'> {
  return {
    queue: [],
    pendingSuggestions: null,
    lastReleaseAt: null,
    scheduleTimer: null,
    streamDone: false,
    completed: null,
    queryClient: null,
  };
}

function getOrCreate(chatRoomId: string): StreamEntry {
  let entry = entries.get(chatRoomId);
  if (!entry) {
    entry = { state: { status: 'idle' }, history: [], ...emptyStreamState() };
    entries.set(chatRoomId, entry);
  }
  return entry;
}

function applyAction(chatRoomId: string, action: Action) {
  const entry = getOrCreate(chatRoomId);
  const next = reducer(entry.state, action);
  if (next !== entry.state) {
    entries.set(chatRoomId, { ...entry, state: next });
    notify();
  }
}

function scheduleRelease(chatRoomId: string): void {
  const entry = entries.get(chatRoomId);
  if (!entry || entry.scheduleTimer) return;

  const hasBubble = entry.queue.length > 0;
  const hasSuggestions = entry.pendingSuggestions !== null;

  if (!hasBubble && !hasSuggestions) {
    if (entry.streamDone) finalize(chatRoomId);
    return;
  }

  let nextDelay = 0;
  if (entry.lastReleaseAt !== null) {
    const gapMs = hasBubble ? Math.max(entry.queue[0].delayMs, BUBBLE_RELEASE_GAP) : 0;
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
  if (!entry) return;

  if (entry.queue.length > 0) {
    const [bubble, ...rest] = entry.queue;
    entries.set(chatRoomId, { ...entry, queue: rest, lastReleaseAt: Date.now() });
    applyAction(chatRoomId, { type: 'APPEND_BUBBLE', bubble });
    scheduleRelease(chatRoomId);
    return;
  }

  if (entry.pendingSuggestions !== null) {
    const suggestions = entry.pendingSuggestions;
    entries.set(chatRoomId, { ...entry, pendingSuggestions: null, lastReleaseAt: Date.now() });
    applyAction(chatRoomId, { type: 'SET_SUGGESTIONS', suggestions });
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

  const newHistory = entry.completed ? [...entry.history, entry.completed] : entry.history;
  const qc = entry.queryClient;
  const hadCompleted = entry.completed !== null;

  entries.set(chatRoomId, {
    state: { status: 'idle' },
    history: newHistory,
    ...emptyStreamState(),
  });
  notify();

  if (qc && hadCompleted) {
    qc.invalidateQueries({ queryKey: chatroomQueries.chatList.queryKey });
    qc.invalidateQueries({ queryKey: chatroomQueries.rooms._def });
  }
}

function clearStreamState(chatRoomId: string) {
  const entry = entries.get(chatRoomId);
  if (!entry) return;
  if (entry.scheduleTimer) clearTimeout(entry.scheduleTimer);
  entries.set(chatRoomId, { ...entry, ...emptyStreamState() });
}

export async function sendMessage(
  chatRoomId: string,
  message: string,
  queryClient: QueryClient,
): Promise<void> {
  const entry = getOrCreate(chatRoomId);
  const { status } = entry.state;
  if (status === 'sending' || status === 'streaming') return;

  const trimmed = message.trim();
  if (!trimmed) return;

  entries.set(chatRoomId, { ...entry, ...emptyStreamState(), queryClient });

  const controller = new AbortController();
  controllers.set(chatRoomId, controller);

  applyAction(chatRoomId, { type: 'SEND', userMessage: trimmed });

  const acc = {
    userMessage: trimmed,
    bubbles: [] as ChatBubble[],
    suggestions: [] as string[],
  };

  try {
    await streamChatMessage(
      chatRoomId,
      trimmed,
      (event) => {
        const current = entries.get(chatRoomId);
        if (!current) return;
        switch (event.type) {
          case 'meta':
            applyAction(chatRoomId, { type: 'META', chatRoomId: event.chatRoomId });
            return;
          case 'bubble': {
            const bubble: ChatBubble = { text: event.text, delayMs: event.delayMs };
            acc.bubbles.push(bubble);
            entries.set(chatRoomId, { ...current, queue: [...current.queue, bubble] });
            scheduleRelease(chatRoomId);
            return;
          }
          case 'suggestions':
            acc.suggestions = event.suggestions;
            entries.set(chatRoomId, { ...current, pendingSuggestions: event.suggestions });
            scheduleRelease(chatRoomId);
            return;
          case 'done': {
            const completed: LocalTurn = {
              kind: 'send',
              userMessage: acc.userMessage,
              bubbles: acc.bubbles,
              suggestions: acc.suggestions,
              completedAt: new Date().toISOString(),
            };
            entries.set(chatRoomId, { ...current, streamDone: true, completed });
            scheduleRelease(chatRoomId);
            return;
          }
          case 'error':
            toast.error(event.message);
            applyAction(chatRoomId, { type: 'ERROR', message: event.message });
            clearStreamState(chatRoomId);
            return;
          case 'skip':
            return;
        }
      },
      controller.signal,
    );
  } catch (e) {
    if (controller.signal.aborted) return;
    const msg = e instanceof Error ? e.message : '메시지 전송에 실패했습니다.';
    toast.error(msg);
    applyAction(chatRoomId, { type: 'ERROR', message: msg });
    clearStreamState(chatRoomId);
    return;
  } finally {
    controllers.delete(chatRoomId);
  }

  const current = entries.get(chatRoomId);
  if (current && !current.streamDone) {
    entries.set(chatRoomId, { ...current, streamDone: true });
    scheduleRelease(chatRoomId);
  }
}

export const chatStreamStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): ReadonlyMap<string, StreamEntry> {
    return snapshot;
  },
};
