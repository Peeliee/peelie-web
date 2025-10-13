import type {
  CategoryMainQuestion,
  CategorySubQuestion,
} from '@/entities/category/model/category.type';

// subQuestion 4개 단위 그룹핑
export const groupSubQuestions = (subQuestions?: CategorySubQuestion[]) =>
  subQuestions
    ? Array.from({ length: Math.ceil(subQuestions.length / 4) }, (_, i) =>
        subQuestions.slice(i * 4, i * 4 + 4),
      )
    : [];

// main 답변에 따라 활성화 세트 선택
export const getActiveQuestionSet = (
  answers: Record<string, string>,
  mainQuestion: CategoryMainQuestion,
  grouped: CategorySubQuestion[][],
) => {
  if (!answers.L0) return [];
  const idx = mainQuestion.subCategoryNames.findIndex((s) => s.name === answers.L0);
  return idx === -1 ? [] : grouped[idx];
};

// 이전 단계가 다 응답되었는지 체크
export const isAllPreviousAnswered = (
  idx: number,
  activeSet: CategorySubQuestion[],
  answers: Record<string, string>,
) => idx === 0 || activeSet.slice(0, idx).every((q) => answers[q.level]);
