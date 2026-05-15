import { useEffect, useSyncExternalStore } from 'react';

import { greetingStore, startGreeting } from '../model/greetingStore';

export function useGreeting(chatRoomId: string) {
  const snapshot = useSyncExternalStore(greetingStore.subscribe, greetingStore.getSnapshot);

  useEffect(() => {
    if (!chatRoomId) return;
    startGreeting(chatRoomId);
  }, [chatRoomId]);

  const entry = snapshot.get(chatRoomId) ?? { turn: null, pending: false };

  return { turn: entry.turn, pending: entry.pending };
}
