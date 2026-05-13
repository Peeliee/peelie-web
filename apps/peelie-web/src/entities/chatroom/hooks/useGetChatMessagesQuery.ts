import { useQuery } from '@tanstack/react-query';
import { chatroomQueries } from '../api/chatroom.queries';

export function useGetChatMessagesQuery(chatRoomId: string) {
  return useQuery({
    ...chatroomQueries.messages(chatRoomId),
    enabled: !!chatRoomId,
  });
}
