import { http, HttpResponse } from 'msw';
import type { CategoryMainQuestionResponseDTO } from '@/entities/category/model/category.type';
import { type ApiErrorMessage } from '@/shared/api/types';

import { categoryMainQuestionMock } from '../data/category';

const CATEGORY_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const matchHandlers = [
  http.get<
    never,
    CategoryMainQuestionResponseDTO,
    CategoryMainQuestionResponseDTO | ApiErrorMessage
  >(`${CATEGORY_API_PREFIX}/questionnaire/categories/:categoryId`, async ({ params }) => {
    const { categoryId } = params;
    const id = Number(categoryId);

    const mock = categoryMainQuestionMock.data[id];

    if (!mock) {
      return HttpResponse.json({
        status: 404,
        success: false,
        message: '해당 카테고리를 찾을 수 없습니다.',
        code: 'NOT_FOUND',
        reason: `categoryId=${id}`,
      });
    }

    const shouldFail = Math.random() < 0.5;
    if (shouldFail) {
      return HttpResponse.json({
        status: 500,
        success: false,
        message: '서버 내부 오류 (mock)',
        code: 'INTERNAL_SERVER_ERROR',
        reason: '무작위 실패 발생 (테스트용)',
      });
    }
    await new Promise((resolve) => setTimeout(resolve, categoryMainQuestionMock.delay));

    return HttpResponse.json({
      data: mock,
      status: 200,
      message: '카테고리 질문 조회 성공',
      success: true,
    });
  }),
];
