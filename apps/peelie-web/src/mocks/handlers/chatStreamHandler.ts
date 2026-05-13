import { http, HttpResponse } from 'msw';

import type { ChatMessage } from '@/entities/chatroom';
import { getApiBaseUrl } from '@/shared/api/baseUrl';

import { ChatMessagesMock } from '../data/chatMessages';
import { pickGreetingTurn, pickMockTurn, type MockTurn } from '../data/chatStream';

const API_PREFIX = getApiBaseUrl();
const MOCK_USER_ID = 'usr_mock_user';
const MOCK_FRIEND_ID = 'usr_friend_mock';
const FIRST_BUBBLE_FIXED_DELAY_MS = 1500;
const SUGGESTIONS_AFTER_DELAY_MS = 200;
const DONE_AFTER_DELAY_MS = 100;

interface SendMessageBody {
  message: string;
}

function sseFrame(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function streamTurn(opts: {
  chatRoomId: string;
  turn: MockTurn;
  /** done 직전 mock DB 에 push 할 콜백 (greeting 은 AVATAR 만, send 는 USER+AVATAR). */
  beforeDone?: () => void;
  signal: AbortSignal;
}): ReadableStream<Uint8Array> {
  const { chatRoomId, turn, beforeDone, signal } = opts;
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        controller.enqueue(
          encoder.encode(
            sseFrame('meta', {
              chatRoomId,
              friendId: MOCK_FRIEND_ID,
              userId: MOCK_USER_ID,
            }),
          ),
        );

        for (let i = 0; i < turn.bubbles.length; i++) {
          const bubble = turn.bubbles[i];
          const sleepMs = i === 0 ? FIRST_BUBBLE_FIXED_DELAY_MS : bubble.delayMs;
          await delay(sleepMs);
          if (signal.aborted) {
            controller.close();
            return;
          }
          controller.enqueue(encoder.encode(sseFrame('bubble', bubble)));
        }

        await delay(SUGGESTIONS_AFTER_DELAY_MS);
        controller.enqueue(encoder.encode(sseFrame('suggestions', turn.suggestions)));

        beforeDone?.();

        await delay(DONE_AFTER_DELAY_MS);
        controller.enqueue(encoder.encode(sseFrame('done', { chatRoomId })));
        controller.close();
      } catch (e) {
        const message = e instanceof Error ? e.message : '[mock] 스트림 오류';
        controller.enqueue(encoder.encode(sseFrame('error', { message })));
        controller.close();
      }
    },
  });
}

function sseHeaders() {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  };
}

export const chatStreamHandlers = [
  // 사용자 메시지 → 챗봇 응답
  http.post<{ chatRoomId: string }, SendMessageBody>(
    `${API_PREFIX}/chatrooms/:chatRoomId/messages/stream`,
    async ({ request, params }) => {
      const { chatRoomId } = params;
      const body = await request.json();
      const userMessage = body.message;
      const turn = pickMockTurn();

      const stream = streamTurn({
        chatRoomId,
        turn,
        signal: request.signal,
        beforeDone: () => {
          const room = ChatMessagesMock.data[chatRoomId];
          if (!room) return;
          const baseId = Date.now();
          const nowIso = new Date().toISOString();
          const userMsg: ChatMessage = {
            id: `msg_${baseId}_u`,
            role: 'USER',
            bubbles: [{ text: userMessage, delayMs: 0 }],
            suggestions: [],
            createdAt: nowIso,
          };
          const avatarMsg: ChatMessage = {
            id: `msg_${baseId}_a`,
            role: 'AVATAR',
            bubbles: turn.bubbles,
            suggestions: turn.suggestions,
            createdAt: nowIso,
          };
          room.items.push(userMsg, avatarMsg);
        },
      });

      return new HttpResponse(stream, { headers: sseHeaders() });
    },
  ),

  // 선제 인사 (V1 mock: skip 분기는 단순화 위해 미구현, 매번 인사)
  http.post<{ chatRoomId: string }>(
    `${API_PREFIX}/chatrooms/:chatRoomId/greeting/stream`,
    async ({ request, params }) => {
      const { chatRoomId } = params;
      const turn = pickGreetingTurn();

      const stream = streamTurn({
        chatRoomId,
        turn,
        signal: request.signal,
        beforeDone: () => {
          const room = ChatMessagesMock.data[chatRoomId];
          if (!room) return;
          const baseId = Date.now();
          const nowIso = new Date().toISOString();
          const avatarMsg: ChatMessage = {
            id: `msg_${baseId}_greet`,
            role: 'AVATAR',
            bubbles: turn.bubbles,
            suggestions: turn.suggestions,
            createdAt: nowIso,
          };
          room.items.push(avatarMsg);
        },
      });

      return new HttpResponse(stream, { headers: sseHeaders() });
    },
  ),
];
