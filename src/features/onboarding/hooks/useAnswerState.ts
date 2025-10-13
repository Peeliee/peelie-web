import { useState } from 'react';

export const useAnswerState = (
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

  return { answers, updateAnswer };
};
