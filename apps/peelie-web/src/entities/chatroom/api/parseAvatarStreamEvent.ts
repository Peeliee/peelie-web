import type { SSEEvent } from '@peelie/sse';
import type { AvatarStreamEvent } from '../model/avatarStream.type';
import {
  DeltaPayloadSchema,
  DonePayloadSchema,
  ErrorPayloadSchema,
  MetaPayloadSchema,
} from './avatarStream.schemas';

export function parseAvatarStreamEvent(raw: SSEEvent): AvatarStreamEvent | null {
  const data: unknown = JSON.parse(raw.data);

  switch (raw.event) {
    case 'meta': {
      const p = MetaPayloadSchema.parse(data);
      return {
        type: 'meta',
        roomId: p.chatRoomPublicId,
        userId: p.userPublicId,
        friendId: p.friendPublicId,
      };
    }
    case 'delta': {
      const p = DeltaPayloadSchema.parse(data);
      return { type: 'delta', content: p.content };
    }
    case 'done': {
      const p = DonePayloadSchema.parse(data);
      return { type: 'done', roomId: p.chatRoomPublicId, answer: p.answer };
    }
    case 'error': {
      const p = ErrorPayloadSchema.parse(data);
      return { type: 'error', message: p.message };
    }
    default:
      return null;
  }
}
