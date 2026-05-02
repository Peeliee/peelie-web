import { createQueryKeys } from '@lukemorales/query-key-factory';

export const aiChatKeys = createQueryKeys('ai-chat', {
  rooms: null,
  messages: (chatRoomPublicId: string) => [chatRoomPublicId],
});
