import { type ApiResponse } from '@/shared/api/types';

type QuestionLevel = 'L1' | 'L2' | 'L3' | 'L4';
type QuestionType = 'CHOICE' | 'TEXT';

// 첫 번째 질문 옵션
export interface SubCategory {
  id: number;
  name: string;
}

// 메인 카테고리 질문 응답
export interface CategoryMainQuestion {
  categoryId: number;
  categoryName: string;
  categoryQuestion: string;
  subCategoryNames: SubCategory[];
}

// L1 ~ L3 질문 선지
export interface QuestionOption {
  optionId: number;
  content: string;
}

export interface CategorySubQuestion {
  questionId: number;
  level: QuestionLevel;
  type: QuestionType;
  content: string;
  options: QuestionOption[];
}

// 첫 번째 질문 응답 DTO
export type CategoryMainQuestionResponseDTO = ApiResponse<CategoryMainQuestion>;
// 나머지 질문 응답 DTO
export type CategorySubQuestionResponseDTO = ApiResponse<CategorySubQuestion[]>;
