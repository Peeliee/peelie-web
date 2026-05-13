import type { SSEEvent } from '@peelie/sse';
import type { ChatStreamEvent } from '../model/chatStream.type';
import {
  BubblePayloadSchema,
  DonePayloadSchema,
  ErrorPayloadSchema,
  MetaPayloadSchema,
  SkipPayloadSchema,
  SuggestionsPayloadSchema,
} from './chatStream.schemas';

export class ChatStreamPayloadError extends Error {
  readonly eventName: string;
  readonly cause: unknown;

  constructor(eventName: string, cause: unknown) {
    super(`잘못된 SSE payload (event: ${eventName})`);
    this.name = 'ChatStreamPayloadError';
    this.eventName = eventName;
    this.cause = cause;
  }
}

export function parseChatStreamEvent(raw: SSEEvent): ChatStreamEvent | null {
  let data: unknown;
  try {
    data = JSON.parse(raw.data);
  } catch (e) {
    throw new ChatStreamPayloadError(raw.event, e);
  }
  try {
    switch (raw.event) {
      case 'meta': {
        const p = MetaPayloadSchema.parse(data);
        return { type: 'meta', ...p };
      }
      case 'bubble': {
        const p = BubblePayloadSchema.parse(data);
        return { type: 'bubble', ...p };
      }
      case 'suggestions': {
        const p = SuggestionsPayloadSchema.parse(data);
        return { type: 'suggestions', suggestions: p };
      }
      case 'done': {
        const p = DonePayloadSchema.parse(data);
        return { type: 'done', chatRoomId: p.chatRoomId };
      }
      case 'skip': {
        SkipPayloadSchema.parse(data);
        return { type: 'skip' };
      }
      case 'error': {
        const p = ErrorPayloadSchema.parse(data);
        return { type: 'error', message: p.message };
      }
      default:
        return null;
    }
  } catch (e) {
    throw new ChatStreamPayloadError(raw.event, e);
  }
}
