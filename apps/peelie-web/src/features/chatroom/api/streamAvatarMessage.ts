import { openSSEConnection } from '@peelie/sse';
import { parseAvatarStreamEvent, type AvatarStreamEvent } from '@/entities/chatroom';

interface StreamRequest {
  friendPublicId: string;
  message: string;
}

export async function streamAvatarMessage(
  request: StreamRequest,
  onEvent: (event: AvatarStreamEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const token = localStorage.getItem('accessToken');
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

  await openSSEConnection({
    url: `${baseUrl}/api/v1/avatar/messages/stream`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: request,
    signal,
    onEvent: (raw) => {
      const parsed = parseAvatarStreamEvent(raw);
      if (parsed) onEvent(parsed);
    },
  });
}
