import { createQueryKeys } from '@lukemorales/query-key-factory';

import { aiChatGet } from './aiChat.api';

export const aiChatQueries = createQueryKeys('aiChat', {
  chatRooms: {
    queryKey: null,
    queryFn: aiChatGet.getChatRooms,
  },
  chatMessages: (chatRoomPublicId: string) => ({
    queryKey: [chatRoomPublicId],
    queryFn: () => aiChatGet.getChatMessages(chatRoomPublicId),
  }),
});
