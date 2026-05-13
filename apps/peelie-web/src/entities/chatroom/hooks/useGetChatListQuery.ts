import { useQuery } from '@tanstack/react-query';
import { chatroomQueries } from '../api/chatroom.queries';

export function useGetChatListQuery() {
  return useQuery(chatroomQueries.chatList);
}
