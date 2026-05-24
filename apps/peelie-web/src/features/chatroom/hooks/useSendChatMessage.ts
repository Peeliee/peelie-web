import { useCallback, useSyncExternalStore } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { LocalTurn } from '@/entities/chatroom';

import { chatStreamStore, sendMessage } from '../model/chatStreamStore';
import type { SendStreamState } from '../model/chatStreamStore';

const IDLE_SEND_STATE: SendStreamState = { status: 'idle' };
const EMPTY_HISTORY: LocalTurn[] = [];

export function useSendChatMessage(chatRoomId: string) {
  const snapshot = useSyncExternalStore(chatStreamStore.subscribe, chatStreamStore.getSnapshot);
  const queryClient = useQueryClient();

  const entry = snapshot.get(chatRoomId);

  const send = useCallback(
    (message: string) => sendMessage(chatRoomId, message, queryClient),
    [chatRoomId, queryClient],
  );

  return {
    state: entry?.state ?? IDLE_SEND_STATE,
    history: entry?.history ?? EMPTY_HISTORY,
    send,
  };
}
