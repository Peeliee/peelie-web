import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';
import type { ChatRoomList } from '../model/chatRoom.type';

export const getChatRooms = async (): Promise<ChatRoomList> => {
  const res = await api.get('avatar/rooms').json<ApiResponse<ChatRoomList>>();
  return res.data;
};
