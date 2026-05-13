import { useQuery } from '@tanstack/react-query';
import { chatroomQueries } from '../api/chatroom.queries';

export function useGetChatRoomsQuery() {
  return useQuery(chatroomQueries.rooms);
}
