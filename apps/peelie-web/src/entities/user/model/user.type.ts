import type { ApiResponse } from '@/shared/api/types';
import type { InteractionStyleKey } from '@/shared/constants/interactionStyle';

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

export interface bioSegment {
  stage: number;
  bio: string;
}

export interface UserResponse {
  userName: string;
  profileImageUrl: string | null;
  instagramId: string | null;
  bio: bioSegment[];
  interactionStyle: InteractionStyleKey;
  card: Card;
}

export type StepInfoCardResponseDTO = ApiResponse<
  GeneratingInfo | GenerateInfoDone | GenerateInfoFail
>;

export type UserResponseDTO = ApiResponse<UserResponse>;
