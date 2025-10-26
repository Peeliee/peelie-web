import { type ApiResponse } from '@/shared/api/types';
import type { InteractionStyleKey } from '@/shared/constants/interactionStyle';
/**
 * 공통 타입 정의
 */
export type OnboardingAnswerLevel = 'L1' | 'L2' | 'L3' | 'L4';
export type InteractionStyle = InteractionStyleKey;

export interface AnswerItem {
  level: OnboardingAnswerLevel;
  L1AnswerId?: number;
  L2AnswerId?: number;
  L3AnswerId?: number;
  L4Answer?: string;
}

/**
 * 온보딩 시작
 */
export interface OnboardingCommonResponse {
  selectedCategoryIds: number[];
  answers: AnswerGroup[];
}

export type AnswerGroup = {
  subCategoryId: number;
  answers: AnswerItem[];
};

/**
 * 카테고리 선택
 */
export interface CategorySelectRequestDTO {
  categoryIds: number[];
}

/**
 * 카테고리 질문 답변
 */
export interface CategoryAnswerRequestDTO {
  subCategoryId: number;
  answers: AnswerItem[];
}

/**
 * 사용자 정보 생성
 */
export interface GenerateStepInfoRequestDTO {
  categoryIds: number[];
}

export interface Stage {
  title: string;
  subtitle: string;
  content: string;
}

export interface Card {
  stage1: Stage;
  stage2: Stage;
  stage3: Stage;
}

export interface GeneratingInfo {
  generationStatus: 'GENERATING';
}

export interface GenerateInfoFail {
  generationStatus: 'FAIL';
}

export interface GenerateInfoDone {
  generationStatus: 'DONE';
  card: Card;
}

/**
 * 교류성향 선택 + 한줄소개 입력
 */
export interface InteractionStyleRequestDTO {
  interactionStyle: InteractionStyle;
  bio: string;
}

export type StartOnboardingResponseDTO = ApiResponse<OnboardingCommonResponse>;
export type CategorySelectResponseDTO = ApiResponse<OnboardingCommonResponse>;
export type CategoryAnswerResponseDTO = ApiResponse<OnboardingCommonResponse>;
export type InteractionStyleResponseDTO = ApiResponse<OnboardingCommonResponse>;
export type StepInfoCardResponseDTO = ApiResponse<
  GeneratingInfo | GenerateInfoDone | GenerateInfoFail
>;
