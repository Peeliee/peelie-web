import { http, HttpResponse } from 'msw';

import type { UserRequestDTO, UserResponseDTO } from '@/entities/user/model/user.type';
import { type ApiErrorMessage } from '@/shared/api/types';
import { UserMock } from '../data/user';

const USER_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const userHandlers = [
  http.get<never, UserResponseDTO, UserResponseDTO | ApiErrorMessage>(
    `${USER_API_PREFIX}/profile`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, UserMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: 'OK',
        data: UserMock.data,
      });
    },
  ),

  http.patch<never, UserRequestDTO, UserResponseDTO | ApiErrorMessage>(
    `${USER_API_PREFIX}/profile`,
    async ({request}) => {
      const body = (await request.json()) as UserRequestDTO;

      await new Promise((resolve) => setTimeout(resolve, UserMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: 'OK',
        data: UserMock.data,
      });
    },
  ),
];
