import { openSSEConnection } from '@peelie/sse';
import { getApiBaseUrl } from '@/shared/api/baseUrl';
import { getAuthHeader } from '@/shared/api/auth';
import { parseChatStreamEvent, type ChatStreamEvent } from '@/entities/chatroom';

export async function streamChatMessage(
  chatRoomId: string,
  message: string,
  onEvent: (event: ChatStreamEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  await openSSEConnection({
    url: `${getApiBaseUrl()}/chatrooms/${chatRoomId}/messages/stream`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: { message },
    signal,
    onEvent: (raw) => {
      const parsed = parseChatStreamEvent(raw);
      if (parsed) onEvent(parsed);
    },
  });
}
