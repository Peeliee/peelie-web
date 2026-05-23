import { useEffect, useRef } from 'react';

import { chatroomPost, markReadInCache, useMarkReadMutation } from '@/entities/chatroom';
import type { LocalTurn } from '@/entities/chatroom';
import { queryClient } from '@/shared/config/quertClient';

interface UseMarkReadOptions {
  chatRoomId: string;
  /** useSendChatMessage 의 history.length — 스트림 완료마다 증가 */
  historyLength: number;
  /** useGreeting 의 turn — greeting 완료 시 null → LocalTurn */
  greetingTurn: LocalTurn | null;
}

export function useMarkRead({ chatRoomId, historyLength, greetingTurn }: UseMarkReadOptions) {
  const { mutate } = useMarkReadMutation();

  // 메시지 스트림 완료 시
  const prevHistoryLengthRef = useRef(historyLength);
  useEffect(() => {
    if (historyLength > prevHistoryLengthRef.current && !document.hidden) {
      mutate(chatRoomId);
    }
    prevHistoryLengthRef.current = historyLength;
  }, [historyLength, chatRoomId, mutate]);

  // greeting 완료 시
  const prevTurnRef = useRef(greetingTurn);
  useEffect(() => {
    if (!prevTurnRef.current && greetingTurn && !document.hidden) {
      mutate(chatRoomId);
    }
    prevTurnRef.current = greetingTurn;
  }, [greetingTurn, chatRoomId, mutate]);

  // 채팅방 unmount 시
  const chatRoomIdRef = useRef(chatRoomId);
  chatRoomIdRef.current = chatRoomId;
  useEffect(() => {
    return () => {
      const id = chatRoomIdRef.current;
      chatroomPost
        .markRead(id)
        .then(() => markReadInCache(queryClient, id))
        .catch(() => {});
    };
  }, []);

  // 탭/앱 백그라운드 전환 시
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'hidden') {
        chatroomPost
          .markRead(chatRoomId)
          .then(() => markReadInCache(queryClient, chatRoomId))
          .catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [chatRoomId]);
}
