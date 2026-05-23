import { useQuery } from '@tanstack/react-query';

import { chatroomQueries } from '../api/chatroom.queries';
import type { ListChatRoomsParams } from '../model/chatRoom.type';

export function useGetChatRoomsQuery(params?: ListChatRoomsParams) {
  return useQuery(chatroomQueries.rooms(params));
}
