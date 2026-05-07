import { http, HttpResponse } from 'msw';
import { ChatMessagesMock } from '../data/aiChat';
import { chunkText, pickMockResponse } from '../data/avatarStream';

const AVATAR_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const MOCK_USER_PUBLIC_ID = 'usr_mock_user';
const MOCK_TARGET_ROOM_ID = 'chr_abc123';
const DELTA_INTERVAL_MS = 35;
const META_DELAY_MS = 200;
const DONE_DELAY_MS = 100;

interface SendMessageRequest {
  friendPublicId: string;
  message: string;
}

function sseFrame(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const avatarStreamHandler = http.post<never, SendMessageRequest>(
  `${AVATAR_API_PREFIX}/avatar/messages/stream`,
  async ({ request }) => {
    const body = await request.json();
    const userMessage = body.message;
    const friendPublicId = body.friendPublicId;

    const answer = pickMockResponse();
    const chunks = chunkText(answer);
    const roomId = MOCK_TARGET_ROOM_ID;

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          await delay(META_DELAY_MS);
          controller.enqueue(
            encoder.encode(
              sseFrame('meta', {
                chatRoomPublicId: roomId,
                userPublicId: MOCK_USER_PUBLIC_ID,
                friendPublicId,
              }),
            ),
          );

          for (const chunk of chunks) {
            await delay(DELTA_INTERVAL_MS);
            if (request.signal.aborted) {
              controller.close();
              return;
            }
            controller.enqueue(encoder.encode(sseFrame('delta', { content: chunk })));
          }

          await delay(DONE_DELAY_MS);

          // mock DB에 USER + AVATAR 메시지 추가 (백엔드 storeAll 흉내)
          const room = ChatMessagesMock.data[roomId];
          if (room) {
            const baseId = Date.now();
            const nowIso = new Date().toISOString();
            room.messages.push(
              { id: baseId, role: 'USER', content: userMessage, createdAt: nowIso },
              { id: baseId + 1, role: 'AVATAR', content: answer, createdAt: nowIso },
            );
          }

          controller.enqueue(
            encoder.encode(
              sseFrame('done', {
                chatRoomPublicId: roomId,
                answer,
              }),
            ),
          );
          controller.close();
        } catch (e) {
          const message = e instanceof Error ? e.message : '[mock] 스트림 오류';
          controller.enqueue(encoder.encode(sseFrame('error', { message })));
          controller.close();
        }
      },
    });

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  },
);
