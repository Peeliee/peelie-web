import { openSSEConnection } from '@peelie/sse';
import { getApiBaseUrl } from '@/shared/api/baseUrl';
import { getAuthHeader } from '@/shared/api/auth';
import { parseChatStreamEvent, type ChatStreamEvent } from '@/entities/chatroom';

export async function streamGreeting(
  chatRoomId: string,
  onEvent: (event: ChatStreamEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  await openSSEConnection({
    url: `${getApiBaseUrl()}/chatrooms/${chatRoomId}/greeting/stream`,
    method: 'POST',
    headers: getAuthHeader(),
    signal,
    onEvent: (raw) => {
      const parsed = parseChatStreamEvent(raw);
      if (parsed) onEvent(parsed);
    },
  });
}
