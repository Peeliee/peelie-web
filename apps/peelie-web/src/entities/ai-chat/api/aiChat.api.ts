import api from '@/shared/api/ky';

import type { ChatRoomListResponseDTO } from '../model/chatRoom.type';
import type { ChatMessageListResponseDTO } from '../model/chatMessage.type';

export const aiChatGet = {
  getChatRooms: async (): Promise<ChatRoomListResponseDTO> =>
    api.get('avatar/rooms').json<ChatRoomListResponseDTO>(),

  getChatMessages: async (chatRoomPublicId: string): Promise<ChatMessageListResponseDTO> =>
    api.get(`avatar/rooms/${chatRoomPublicId}/messages`).json<ChatMessageListResponseDTO>(),
};
