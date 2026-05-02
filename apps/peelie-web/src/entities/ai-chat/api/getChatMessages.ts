import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';
import type { ChatMessageList } from '../model/chatMessage.type';

export const getChatMessages = async (chatRoomPublicId: string): Promise<ChatMessageList> => {
  const res = await api
    .get(`avatar/rooms/${chatRoomPublicId}/messages`)
    .json<ApiResponse<ChatMessageList>>();
  return res.data;
};
