import { useEffect, useSyncExternalStore } from 'react';

import { greetingStore, startGreeting } from '../model/greetingStore';

const GREETING_DELAY_MS = 1800;

export function useGreeting(chatRoomId: string) {
  const snapshot = useSyncExternalStore(greetingStore.subscribe, greetingStore.getSnapshot);

  useEffect(() => {
    if (!chatRoomId) return;
    const timer = setTimeout(() => startGreeting(chatRoomId), GREETING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [chatRoomId]);

  const entry = snapshot.get(chatRoomId) ?? { turn: null, pending: false };

  return { turn: entry.turn, pending: entry.pending };
}
