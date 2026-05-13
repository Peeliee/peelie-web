import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import type { ChatBubble, LocalTurn } from '@/entities/chatroom';

import { streamGreeting } from '../api/streamGreeting';

/**
 * 채팅방 진입 시 선제 인사 SSE 호출.
 * BE 가 lastEnteredAt KST 비교로 skip 판단하므로 매번 호출해도 안전.
 * V1 에선 streaming 중간 상태는 화면에 노출하지 않고, 완료된 turn 만 반환한다.
 */
export function useGreeting(chatRoomId: string) {
  const [turn, setTurn] = useState<LocalTurn | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!chatRoomId) return;
    const controller = new AbortController();
    abortRef.current = controller;

    const acc = { bubbles: [] as ChatBubble[], suggestions: [] as string[] };
    let completed: LocalTurn | null = null;
    let skipped = false;

    streamGreeting(
      chatRoomId,
      (event) => {
        switch (event.type) {
          case 'skip':
            skipped = true;
            return;
          case 'meta':
            return;
          case 'bubble':
            acc.bubbles.push({ text: event.text, delayMs: event.delayMs });
            return;
          case 'suggestions':
            acc.suggestions = event.suggestions;
            return;
          case 'done':
            completed = {
              kind: 'greeting',
              bubbles: acc.bubbles,
              suggestions: acc.suggestions,
              completedAt: new Date().toISOString(),
            };
            return;
          case 'error':
            toast.error(event.message);
            return;
        }
      },
      controller.signal,
    )
      .catch((e) => {
        if (controller.signal.aborted) return;
        toast.error(e instanceof Error ? e.message : '인사 로딩 실패');
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        if (!skipped && completed) {
          setTurn(completed);
        }
      });

    return () => controller.abort();
  }, [chatRoomId]);

  return { turn };
}
