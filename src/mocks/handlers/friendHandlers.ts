import { http, HttpResponse } from 'msw';
import type {
  FriendListResponseDTO,
  FriendProfileResponseDTO,
  RandomFriendListResponseDTO,
} from '@/entities/friend/model/friend.type';
import type { ApiErrorMessage } from '@/shared/api/types';

import { FriendListMock, FriendProfileMock, RandomFriendListMock } from '../data/friend';

const FRIEND_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const friendHandlers = [
  // 랜덤 친구 5명
  http.get<never, RandomFriendListResponseDTO, RandomFriendListResponseDTO | ApiErrorMessage>(
    `${FRIEND_API_PREFIX}/friends/random`,
    async () => {
      const mock = RandomFriendListMock.data;
      console.log('mock');
      if (!mock) {
        return HttpResponse.json({
          status: 404,
          success: false,
          message: '랜덤 친구 가져오기 실패',
          code: 'NOT_FOUND',
          reason: '아무튼 없습니다',
        });
      }
      await new Promise((resolve) => setTimeout(resolve, RandomFriendListMock.delay));

      return HttpResponse.json({
        data: mock,
        status: 200,
        message: '랜덤 친구 조회 성공',
        success: true,
      });
    },
  ),

  // 친구 리스트
  http.get<never, FriendListResponseDTO, FriendListResponseDTO | ApiErrorMessage>(
    `${FRIEND_API_PREFIX}/friends`,
    async () => {
      const mock = FriendListMock.data;

      if (!mock) {
        return HttpResponse.json({
          status: 404,
          success: false,
          message: '친구 리스트 가져오기 실패',
          code: 'NOT_FOUND',
          reason: '아무튼 없습니다',
        });
      }
      await new Promise((resolve) => setTimeout(resolve, FriendListMock.delay));

      return HttpResponse.json({
        data: mock,
        status: 200,
        message: '친구 리스트 조회 성공',
        success: true,
      });
    },
  ),

  // 친구 프로필
  http.get<never, FriendProfileResponseDTO, FriendProfileResponseDTO | ApiErrorMessage>(
    `${FRIEND_API_PREFIX}/friends/:friendId`,
    async ({ params }) => {
      const { friendId } = params;
      const mock = FriendProfileMock.data[Number(friendId)];

      if (!mock) {
        return HttpResponse.json({
          status: 404,
          success: false,
          message: '친구 프로필 가져오기 실패',
          code: 'NOT_FOUND',
          reason: '아무튼 없습니다',
        });
      }
      await new Promise((resolve) => setTimeout(resolve, FriendProfileMock.delay));

      return HttpResponse.json({
        data: mock,
        status: 200,
        message: '친구 프로필 조회 성공',
        success: true,
      });
    },
  ),
];
