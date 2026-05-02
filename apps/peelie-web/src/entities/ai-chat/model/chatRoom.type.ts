import type { ApiResponse } from '@/shared/api/types';

export interface ChatRoomItem {
  chatRoomPublicId: string;
  friendId: number;
  lastMessageAt: string;
}

export interface ChatRoomList {
  chatRooms: ChatRoomItem[];
}

export type ChatRoomListResponseDTO = ApiResponse<ChatRoomList>;
