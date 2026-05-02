import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { aiChatQueries } from '@/entities/ai-chat';
import { streamAvatarMessage } from '../api/streamAvatarMessage';

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'streaming'; roomId: string; content: string }
  | { status: 'done'; roomId: string; answer: string }
  | { status: 'error'; message: string };

type Action =
  | { type: 'SEND' }
  | { type: 'META'; roomId: string }
  | { type: 'DELTA'; content: string }
  | { type: 'DONE'; roomId: string; answer: string }
  | { type: 'ERROR'; message: string }
  | { type: 'RESET' };

const initialState: State = { status: 'idle' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SEND':
      return { status: 'sending' };
    case 'META':
      return { status: 'streaming', roomId: action.roomId, content: '' };
    case 'DELTA':
      if (state.status !== 'streaming') return state;
      return { ...state, content: state.content + action.content };
    case 'DONE':
      return { status: 'done', roomId: action.roomId, answer: action.answer };
    case 'ERROR':
      return { status: 'error', message: action.message };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useSendAiMessage(friendPublicId: string) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (message: string) => {
      const trimmed = message.trim();
      if (!trimmed) return;
      if (state.status === 'sending' || state.status === 'streaming') return;

      const controller = new AbortController();
      abortRef.current = controller;
      dispatch({ type: 'SEND' });

      try {
        await streamAvatarMessage(
          { friendPublicId, message: trimmed },
          (event) => {
            switch (event.type) {
              case 'meta':
                return dispatch({ type: 'META', roomId: event.roomId });
              case 'delta':
                return dispatch({ type: 'DELTA', content: event.content });
              case 'done':
                return dispatch({ type: 'DONE', roomId: event.roomId, answer: event.answer });
              case 'error':
                return dispatch({ type: 'ERROR', message: event.message });
            }
          },
          controller.signal,
        );
      } catch (e) {
        if (controller.signal.aborted) return;
        const msg = e instanceof Error ? e.message : '메시지 전송에 실패했습니다.';
        dispatch({ type: 'ERROR', message: msg });
      }
    },
    [friendPublicId, state.status],
  );

  useEffect(() => {
    if (state.status !== 'done') return;
    queryClient.invalidateQueries({
      queryKey: aiChatQueries.chatMessages(state.roomId).queryKey,
    });
  }, [state, queryClient]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: 'RESET' });
  }, []);

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return { state, send, abort, reset };
}
