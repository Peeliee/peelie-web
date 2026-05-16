import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { chatroomPost, chatroomQueries } from '@/entities/chatroom';
import type { LocalTurn } from '@/entities/chatroom';

interface UseMarkReadOptions {
  chatRoomId: string;
  /** useSendChatMessage 의 history.length — 스트림 완료마다 증가 */
  historyLength: number;
  /** useGreeting 의 turn — greeting 완료 시 null → LocalTurn */
  greetingTurn: LocalTurn | null;
}

export function useMarkRead({ chatRoomId, historyLength, greetingTurn }: UseMarkReadOptions) {
  const queryClient = useQueryClient();

  const fire = useCallback(() => {
    chatroomPost.markRead(chatRoomId).catch(() => {});
    queryClient.invalidateQueries({ queryKey: chatroomQueries.chatList.queryKey });
  }, [chatRoomId, queryClient]);

  // 메시지 스트림 완료 시
  const prevHistoryLengthRef = useRef(historyLength);
  useEffect(() => {
    if (historyLength > prevHistoryLengthRef.current && !document.hidden) {
      fire();
    }
    prevHistoryLengthRef.current = historyLength;
  }, [historyLength, fire]);

  // greeting 완료 시
  const prevTurnRef = useRef(greetingTurn);
  useEffect(() => {
    if (!prevTurnRef.current && greetingTurn && !document.hidden) {
      fire();
    }
    prevTurnRef.current = greetingTurn;
  }, [greetingTurn, fire]);

  // 채팅방 unmount 시 (chatRoomId ref 사용 — stale closure 방지)
  const chatRoomIdRef = useRef(chatRoomId);
  chatRoomIdRef.current = chatRoomId;
  useEffect(() => {
    return () => {
      chatroomPost.markRead(chatRoomIdRef.current).catch(() => {});
    };
  }, []);

  // 탭/앱 백그라운드 전환 시
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'hidden') {
        chatroomPost.markRead(chatRoomId).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [chatRoomId]);
}
