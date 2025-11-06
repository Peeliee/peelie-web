import type { ApiResponse } from '@/shared/api/types';

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

export type StepInfoCardResponseDTO = ApiResponse<
  GeneratingInfo | GenerateInfoDone | GenerateInfoFail
>;
