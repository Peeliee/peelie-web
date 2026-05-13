import { http, HttpResponse } from 'msw';

import type { ChatListItem, ChatMessageListPayload, ChatRoomListItem } from '@/entities/chatroom';
import { getApiBaseUrl } from '@/shared/api/baseUrl';
import type { ApiErrorMessage, ApiResponse } from '@/shared/api/types';

import { ChatListMock } from '../data/chatList';
import { ChatMessagesMock } from '../data/chatMessages';
import { ChatRoomsMock } from '../data/chatRooms';

const API_PREFIX = getApiBaseUrl();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const chatroomHandlers = [
  // AI챗 목록 (preview + isUnread)
  http.get<never, never, ApiResponse<ChatListItem[]> | ApiErrorMessage>(
    `${API_PREFIX}/chat-list`,
    async () => {
      await delay(ChatListMock.delay);
      return HttpResponse.json({
        data: ChatListMock.data,
        status: 200,
        message: 'OK',
        success: true,
      });
    },
  ),

  // 홈 활성 약속 목록
  http.get<never, never, ApiResponse<ChatRoomListItem[]> | ApiErrorMessage>(
    `${API_PREFIX}/chatrooms`,
    async () => {
      await delay(ChatRoomsMock.delay);
      return HttpResponse.json({
        data: ChatRoomsMock.data,
        status: 200,
        message: 'OK',
        success: true,
      });
    },
  ),

  // 채팅방 메시지 페이징 (V1 은 첫 페이지만, nextCursor 무시)
  http.get<{ chatRoomId: string }, never, ApiResponse<ChatMessageListPayload> | ApiErrorMessage>(
    `${API_PREFIX}/chatrooms/:chatRoomId/messages`,
    async ({ params }) => {
      const { chatRoomId } = params;
      const payload = ChatMessagesMock.data[chatRoomId] ?? {
        items: [],
        nextCursor: null,
      };
      await delay(ChatMessagesMock.delay);
      return HttpResponse.json({
        data: payload,
        status: 200,
        message: 'OK',
        success: true,
      });
    },
  ),
];
