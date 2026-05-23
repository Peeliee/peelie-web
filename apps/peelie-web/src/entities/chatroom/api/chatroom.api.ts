import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';

import type { ChatListItem } from '../model/chatList.type';
import type { ChatRoomListItem, ListChatRoomsParams } from '../model/chatRoom.type';
import type { ChatMessageListPayload } from '../model/chatMessage.type';

export const chatroomPost = {
  markRead: (chatRoomId: string): Promise<void> =>
    api.post(`chatrooms/${chatRoomId}/read`).then(() => undefined),
};

export const chatroomGet = {
  /** AI 챗 페이지 — 전체 채팅방 목록 (preview + unread 포함). */
  getChatList: (): Promise<ApiResponse<ChatListItem[]>> =>
    api.get('chat-list').json<ApiResponse<ChatListItem[]>>(),

  /** 홈 — KST 오늘 이후 약속의 chatRoom 만. */
  getChatRooms: (params?: ListChatRoomsParams): Promise<ApiResponse<ChatRoomListItem[]>> =>
    api
      .get('chatrooms', {
        searchParams: {
          ...(params?.sort && { sort: params.sort }),
        },
      })
      .json<ApiResponse<ChatRoomListItem[]>>(),

  /** 채팅방 메시지 페이징 (cursor: before). */
  getChatMessages: (
    chatRoomId: string,
    params?: { before?: string; limit?: number },
  ): Promise<ApiResponse<ChatMessageListPayload>> =>
    api
      .get(`chatrooms/${chatRoomId}/messages`, { searchParams: params })
      .json<ApiResponse<ChatMessageListPayload>>(),
};
