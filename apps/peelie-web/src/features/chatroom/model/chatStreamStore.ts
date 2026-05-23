import type { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { chatroomQueries } from '@/entities/chatroom';
import type { ChatBubble, LocalTurn } from '@/entities/chatroom';

import { streamChatMessage } from '../api/streamChatMessage';

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
}

const entries = new Map<string, StreamEntry>();
const controllers = new Map<string, AbortController>();
const listeners = new Set<() => void>();
let snapshot: ReadonlyMap<string, StreamEntry> = new Map();

function notify() {
  snapshot = new Map(entries);
  listeners.forEach((l) => l());
}

function getOrCreate(chatRoomId: string): StreamEntry {
  let entry = entries.get(chatRoomId);
  if (!entry) {
    entry = { state: { status: 'idle' }, history: [] };
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

  const controller = new AbortController();
  controllers.set(chatRoomId, controller);

  applyAction(chatRoomId, { type: 'SEND', userMessage: trimmed });

  const acc = {
    userMessage: trimmed,
    bubbles: [] as ChatBubble[],
    suggestions: [] as string[],
  };
  let completed: LocalTurn | null = null;
  let errored = false;

  try {
    await streamChatMessage(
      chatRoomId,
      trimmed,
      (event) => {
        switch (event.type) {
          case 'meta':
            applyAction(chatRoomId, { type: 'META', chatRoomId: event.chatRoomId });
            return;
          case 'bubble': {
            const bubble: ChatBubble = { text: event.text, delayMs: event.delayMs };
            acc.bubbles.push(bubble);
            applyAction(chatRoomId, { type: 'APPEND_BUBBLE', bubble });
            return;
          }
          case 'suggestions':
            acc.suggestions = event.suggestions;
            applyAction(chatRoomId, { type: 'SET_SUGGESTIONS', suggestions: event.suggestions });
            return;
          case 'done':
            completed = {
              kind: 'send',
              userMessage: acc.userMessage,
              bubbles: acc.bubbles,
              suggestions: acc.suggestions,
              completedAt: new Date().toISOString(),
            };
            return;
          case 'error':
            errored = true;
            toast.error(event.message);
            applyAction(chatRoomId, { type: 'ERROR', message: event.message });
            return;
          case 'skip':
            return;
        }
      },
      controller.signal,
    );
  } catch (e) {
    if (controller.signal.aborted) return;
    errored = true;
    const msg = e instanceof Error ? e.message : '메시지 전송에 실패했습니다.';
    toast.error(msg);
    applyAction(chatRoomId, { type: 'ERROR', message: msg });
    return;
  } finally {
    controllers.delete(chatRoomId);
  }

  if (completed && !errored) {
    const turn = completed as LocalTurn;
    const current = getOrCreate(chatRoomId);
    entries.set(chatRoomId, {
      state: { status: 'idle' },
      history: [...current.history, turn],
    });
    notify();
    queryClient.invalidateQueries({ queryKey: chatroomQueries.chatList.queryKey });
    queryClient.invalidateQueries({ queryKey: chatroomQueries.rooms._def });
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
