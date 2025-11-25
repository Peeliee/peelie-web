import { type ApiResponse } from '@/shared/api/types';
import { type InteractionStyleKey } from '@/shared/constants/interactionStyle';
import { type Card } from '@/entities/user/model/user.type';

// 퀴즈 get
export interface GetQuizRequestDTO {
  userId: number;
  stage: number;
}

// 퀴즈 선지
export interface QuizOption {
  optionId: number;
  text: string;
}

// 퀴즈
export interface Quiz {
  quizId: number;
  quiz: string;
  answerId: number;
  answer: QuizOption[];
}

// 퀴즈 채점
export interface GradeQuizRequestDTO {
  quizId: number;
  optionId: number;
}

export interface GradeQuizResponse {
  answer: boolean;
}

// 스테이지 해제
export interface UnlockStageRequestDTO {
  userId: number;
  stage: number;
}

export interface BioSegment {
  text: string;
  bold: boolean;
}

export interface UnlockStageResponse {
  userId: number;
  userName: string;
  profileImageUrl: string | null;
  instagramId: string | null;
  bio: BioSegment[];
  interactionStyle: InteractionStyleKey;
  card: Card;
}

export type GetQuizResponseDTO = ApiResponse<Quiz[]>;
export type GradeQuizResponseDTO = ApiResponse<GradeQuizResponse>;
export type UnlockStageResponseDTO = ApiResponse<UnlockStageResponse>;
