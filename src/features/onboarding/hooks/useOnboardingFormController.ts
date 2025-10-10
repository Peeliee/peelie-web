import { useState, useMemo } from 'react';

import type {
  CategoryMainQuestion,
  CategorySubQuestion,
} from '@/entities/category/model/category.type';

export const useOnboardingFormController = (
  mainQuestion: CategoryMainQuestion,
  subQuestions?: CategorySubQuestion[],
  initialAnswers: Record<string, string> = {},
  onChange?: (answers: Record<string, string>) => void,
) => {
  const [answers, setAnswers] = useState(initialAnswers);

  // 선택된 질문 답변 갱신
  const updateAnswer = (level: string, value: string) => {
    const next = level === 'L0' ? { L0: value } : { ...answers, [level]: value };
    setAnswers(next);
    onChange?.(next);
  };

  // subQuestion 을 4개 단위로 묶음.
  const getQuestionGroups = useMemo(() => {
    if (!subQuestions) return [];
    return Array.from({ length: Math.ceil(subQuestions.length / 4) }, (_, i) =>
      subQuestions.slice(i * 4, i * 4 + 4),
    );
  }, [subQuestions]);

  // main 질문 답변 따라 현재 활성화 된 sub 계산
  const activeQuestionSet = useMemo(() => {
    if (!answers.L0) return [];
    const idx = mainQuestion.subCategoryNames.findIndex((s) => s.name === answers.L0);
    return idx === -1 ? [] : getQuestionGroups[idx];
  }, [answers.L0, getQuestionGroups, mainQuestion.subCategoryNames]);

  // 이전 질문 응답된 상태인지 확인
  const isNextQuestionVisible = (idx: number) =>
    idx === 0 || activeQuestionSet.slice(0, idx).every((prev) => answers[prev.level]);

  return { answers, updateAnswer, activeQuestionSet, isNextQuestionVisible };
};
