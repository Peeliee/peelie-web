import { useQuery } from '@tanstack/react-query';

import { aiChatQueries } from '../api/aiChat.queries';

export const useGetChatMessagesQuery = (chatRoomPublicId: string) => {
  return useQuery({
    ...aiChatQueries.chatMessages(chatRoomPublicId),
    enabled: !!chatRoomPublicId,
  });
};
