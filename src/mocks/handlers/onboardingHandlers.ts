import { http, HttpResponse } from 'msw';
import type {
  StartOnboardingResponseDTO,
  CategorySelectResponseDTO,
  CategoryAnswerResponseDTO,
  InteractionStyleResponseDTO,
} from '@/entities/onboarding/model/onboarding.type';
import { type StepInfoCardResponseDTO } from '@/entities/user/model/user.type';
import type { ApiErrorMessage, ApiBaseResponse } from '@/shared/api/types';

import {
  onboardingStartMock,
  categorySelectMock,
  categoryAnswerMock,
  interactionStyleMock,
  userStepInfoMakingMock,
  userSetpInfoMock,
} from '../data/onboarding';

const ONBOARDING_API_PREFIX = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

let generationStartTime: number | null = null;

// TODO: 실패 응답 구현하기
export const onboardingHandlers = [
  // 온보딩 시작
  http.post<never, StartOnboardingResponseDTO, StartOnboardingResponseDTO | ApiErrorMessage>(
    `${ONBOARDING_API_PREFIX}/onboarding/start`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, onboardingStartMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: '온보딩 시작 성공',
        data: onboardingStartMock.data,
      });
    },
  ),

  // 카테고리 선택
  http.put<never, CategorySelectResponseDTO, CategorySelectResponseDTO | ApiErrorMessage>(
    `${ONBOARDING_API_PREFIX}/onboarding/categories`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, categorySelectMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: '카테고리 선택 성공',
        data: categorySelectMock.data,
      });
    },
  ),

  // 카테고리 질문 답변
  http.put<never, CategoryAnswerResponseDTO, CategoryAnswerResponseDTO | ApiErrorMessage>(
    `${ONBOARDING_API_PREFIX}/onboarding/answers`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, categoryAnswerMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: '카테고리 답변 저장 성공',
        data: categoryAnswerMock.data,
      });
    },
  ),

  // 교류 성향 선택
  http.put<never, InteractionStyleResponseDTO, InteractionStyleResponseDTO | ApiErrorMessage>(
    `${ONBOARDING_API_PREFIX}/onboarding/interaction`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, interactionStyleMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: '교류 성향 선택 성공',
        data: interactionStyleMock.data,
      });
    },
  ),

  http.post<never, ApiBaseResponse | ApiErrorMessage>(
    `${ONBOARDING_API_PREFIX}/onboarding/card/generate`,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: 'OK',
      });
    },
  ),

  // 유저 단계별 정보 get
  http.get<never, StepInfoCardResponseDTO, StepInfoCardResponseDTO | ApiErrorMessage>(
    `${ONBOARDING_API_PREFIX}/onboarding/card/status`,
    async () => {
      if (!generationStartTime) {
        generationStartTime = Date.now();
      }

      const elapsed = Date.now() - generationStartTime;

      if (elapsed < 3000) {
        await new Promise((resolve) => setTimeout(resolve, userStepInfoMakingMock.delay));

        return HttpResponse.json({
          status: 200,
          success: true,
          message: '카드 생성 중',
          data: userStepInfoMakingMock.data,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, userSetpInfoMock.delay));

      return HttpResponse.json({
        status: 200,
        success: true,
        message: 'OK',
        data: userSetpInfoMock.data,
      });
    },
  ),
];
