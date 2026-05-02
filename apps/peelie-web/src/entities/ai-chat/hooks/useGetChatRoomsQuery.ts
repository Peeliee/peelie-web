import { useQuery } from '@tanstack/react-query';

import { aiChatQueries } from '../api/aiChat.queries';

export const useGetChatRoomsQuery = () => {
  return useQuery(aiChatQueries.chatRooms);
};
