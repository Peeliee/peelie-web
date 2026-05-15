import { useCallback, useSyncExternalStore } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { chatStreamStore, sendMessage } from '../model/chatStreamStore';

export function useSendChatMessage(chatRoomId: string) {
  const snapshot = useSyncExternalStore(chatStreamStore.subscribe, chatStreamStore.getSnapshot);
  const queryClient = useQueryClient();

  const entry = snapshot.get(chatRoomId) ?? { state: { status: 'idle' as const }, history: [] };

  const send = useCallback(
    (message: string) => sendMessage(chatRoomId, message, queryClient),
    [chatRoomId, queryClient],
  );

  return { state: entry.state, history: entry.history, send };
}
