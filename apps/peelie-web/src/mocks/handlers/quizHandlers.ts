import { http, HttpResponse } from 'msw';

import type { GetQuizResponseDTO, UnlockStageResponseDTO } from '@/entities/quiz/model/quiz.type';
import type { ApiErrorMessage } from '@/shared/api/types';

import { quizMock, unlockStageMock } from '../data/quiz';

const QUIZ_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const quizHandlers = [
  http.get<never, GetQuizResponseDTO, GetQuizResponseDTO | ApiErrorMessage>(
    `${QUIZ_API_PREFIX}/quiz?userId=:userId&stage=:stage`,
    async ({ request }) => {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');
      const stage = url.searchParams.get('stage');
      console.log('userId : ', userId, 'stage : ', stage);
      await new Promise((resolve) => setTimeout(resolve, quizMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: '카드 생성 중',
        data: quizMock.data,
      });
    },
  ),

  http.post<never, UnlockStageResponseDTO, UnlockStageResponseDTO | ApiErrorMessage>(
    `${QUIZ_API_PREFIX}/quiz/unlock`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, unlockStageMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: '카드 생성 중',
        data: unlockStageMock.data,
      });
    },
  ),
];
