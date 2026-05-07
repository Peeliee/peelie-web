import { http, HttpResponse } from 'msw';
import type { ChatRoomList } from '@/entities/ai-chat/model/chatRoom.type';
import type { ChatMessageList } from '@/entities/ai-chat/model/chatMessage.type';
import type { ApiResponse, ApiErrorMessage } from '@/shared/api/types';
import { ChatRoomListMock, ChatMessagesMock } from '../data/aiChat';

const AVATAR_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const aiChatHandlers = [
  // 채팅방 목록
  http.get<never, never, ApiResponse<ChatRoomList> | ApiErrorMessage>(
    `${AVATAR_API_PREFIX}/avatar/rooms`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, ChatRoomListMock.delay));

      return HttpResponse.json({
        data: ChatRoomListMock.data,
        status: 200,
        message: '채팅방 목록 조회 성공',
        success: true,
      });
    },
  ),

  // 채팅방 메시지 목록
  http.get<{ chatRoomPublicId: string }, never, ApiResponse<ChatMessageList> | ApiErrorMessage>(
    `${AVATAR_API_PREFIX}/avatar/rooms/:chatRoomPublicId/messages`,
    async ({ params }) => {
      const { chatRoomPublicId } = params;
      const mock = ChatMessagesMock.data[chatRoomPublicId];

      if (!mock) {
        return HttpResponse.json({
          status: 404,
          success: false,
          message: '채팅방 메시지 조회 실패',
          code: 'NOT_FOUND',
          reason: '해당 채팅방이 존재하지 않습니다',
        });
      }

      await new Promise((resolve) => setTimeout(resolve, ChatMessagesMock.delay));

      return HttpResponse.json({
        data: mock,
        status: 200,
        message: '채팅방 메시지 조회 성공',
        success: true,
      });
    },
  ),
];
