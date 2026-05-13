import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
  | { type: 'ERROR'; message: string }
  | { type: 'RESET' };

const initialState: State = { status: 'idle' };

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
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useSendChatMessage(chatRoomId: string) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [history, setHistory] = useState<LocalTurn[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const queryClient = useQueryClient();
  const isBusy = state.status === 'sending' || state.status === 'streaming';

  const send = useCallback(
    async (message: string) => {
      const trimmed = message.trim();
      if (!trimmed) return;
      if (isBusy) return;

      const controller = new AbortController();
      abortRef.current = controller;
      dispatch({ type: 'SEND', userMessage: trimmed });

      // 스트림 처리 진실 저장소. dispatch 직후 reducer state 동기 read 안 함.
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
                dispatch({ type: 'META', chatRoomId: event.chatRoomId });
                return;
              case 'bubble': {
                const bubble: ChatBubble = { text: event.text, delayMs: event.delayMs };
                acc.bubbles.push(bubble);
                dispatch({ type: 'APPEND_BUBBLE', bubble });
                return;
              }
              case 'suggestions':
                acc.suggestions = event.suggestions;
                dispatch({ type: 'SET_SUGGESTIONS', suggestions: event.suggestions });
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
                dispatch({ type: 'ERROR', message: event.message });
                return;
              case 'skip':
                // send 흐름엔 안 옴
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
        dispatch({ type: 'ERROR', message: msg });
        return;
      }

      if (completed && !errored) {
        const turn = completed;
        setHistory((prev) => [...prev, turn]);
        dispatch({ type: 'RESET' });
        queryClient.invalidateQueries({ queryKey: chatroomQueries.chatList.queryKey });
        queryClient.invalidateQueries({ queryKey: chatroomQueries.rooms.queryKey });
      }
    },
    [chatRoomId, isBusy, queryClient],
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  return { state, history, send };
}
