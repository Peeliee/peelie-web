import type {
  CategoryMainQuestion,
  CategorySubQuestion,
} from '@/entities/category/model/category.type';
import type { CategoryAnswerRequestDTO } from '@/entities/onboarding/model/onboarding.type';

interface AnswerLevels {
  L0?: number;
  L1?: number;
  L2?: number;
  L3?: number;
  L4?: string;
}

// subQuestion 4개 단위 그룹핑
export const groupSubQuestions = (subQuestions?: CategorySubQuestion[]) =>
  subQuestions
    ? Array.from({ length: Math.ceil(subQuestions.length / 4) }, (_, i) =>
        subQuestions.slice(i * 4, i * 4 + 4),
      )
    : [];

// main 답변에 따라 활성화 세트 선택
export const getActiveQuestionSet = (
  answers: AnswerLevels,
  mainQuestion: CategoryMainQuestion,
  grouped: CategorySubQuestion[][],
) => {
  if (!answers.L0) return [];
  const idx = mainQuestion.subCategoryNames.findIndex((s) => s.id === answers.L0);

  return idx === -1 ? [] : grouped[idx];
};

// 이전 단계가 다 응답되었는지 체크
export const isAllPreviousAnswered = (
  idx: number,
  activeSet: CategorySubQuestion[],
  answers: AnswerLevels,
) => {
  return idx === 0 || activeSet.slice(0, idx).every((q) => answers[q.level]);
};

// 카테고리 질문 DTO 변환
export const convertAnswersToDTO = (answers: AnswerLevels): CategoryAnswerRequestDTO | null => {
  if (!answers.L0) {
    return null;
  }

  return {
    subCategoryId: answers.L0,
    answers: [
      answers.L1 && { level: 'L1', L1AnswerId: answers.L1 },
      answers.L2 && { level: 'L2', L2AnswerId: answers.L2 },
      answers.L3 && { level: 'L3', L3AnswerId: answers.L3 },
      answers.L4 && { level: 'L4', L4Answer: answers.L4 },
    ].filter(Boolean),
  } as CategoryAnswerRequestDTO;
};
