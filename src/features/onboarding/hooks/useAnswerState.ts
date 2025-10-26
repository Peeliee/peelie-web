import { useState } from 'react';

interface AnswerLevels {
  L0?: number;
  L1?: number;
  L2?: number;
  L3?: number;
  L4?: string;
}

export const useAnswerState = (
  initialAnswers: AnswerLevels = {},
  onChange?: (answers: AnswerLevels) => void,
) => {
  const [answers, setAnswers] = useState<AnswerLevels>(initialAnswers);

  /**
   * 선택된 질문 답변 갱신
   * @param level L0~L4
   * @param value number | string
   * L0 ~ L3 은 number, L4 는 string
   */
  const updateAnswer = <K extends keyof AnswerLevels>(level: K, value: number | string) => {
    const next: AnswerLevels =
      level === 'L0' ? { L0: value as number } : { ...answers, [level]: value };

    setAnswers(next);
    onChange?.(next);
  };

  return { answers, updateAnswer };
};
