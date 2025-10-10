import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  OnboardingChoiceQuestion,
  OnboardingTextQuestion,
} from '@/features/onboarding/ui/OnboardingQuestion';
import type {
  CategoryMainQuestion,
  CategorySubQuestion,
} from '@/entities/category/model/category.type';

interface OnboardingQuestionFormProps {
  mainQuestion: CategoryMainQuestion;
  subQuestions?: CategorySubQuestion[];
  isSubLoading?: boolean;
  onChange?: (answers: Record<string, string>) => void;
  initialAnswers?: Record<string, string>;
}

export const OnboardingQuestionForm = ({
  mainQuestion,
  subQuestions,
  isSubLoading,
  initialAnswers = {},
  onChange,
}: OnboardingQuestionFormProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);

  const handleAnswer = (level: string, value: string) => {
    let next = { ...answers, [level]: value };

    if (level === 'L0') {
      next = { L0: value };
    } else {
      next = { ...answers, [level]: value };
    }

    setAnswers(next);
    onChange?.(next);
  };

  const groupedSubQuestions = useMemo(() => {
    if (!subQuestions) return [];
    const result: CategorySubQuestion[][] = [];
    for (let i = 0; i < subQuestions.length; i += 4) {
      result.push(subQuestions.slice(i, i + 4));
    }
    return result;
  }, [subQuestions]);

  const currentSetIndex = useMemo(() => {
    if (!answers.L0) return null;
    const idx = mainQuestion.subCategoryNames.findIndex((s) => s.name === answers.L0);
    return idx === -1 ? null : idx;
  }, [answers.L0, mainQuestion.subCategoryNames]);

  const currentSet = currentSetIndex !== null ? groupedSubQuestions[currentSetIndex] : [];

  if (isSubLoading || !subQuestions) {
    return <div className="text-center mt-20">질문 불러오는 중...</div>;
  }

  return (
    <div className="space-y-6 mb-6">
      {/* main 질문 */}
      <OnboardingChoiceQuestion
        level="L0"
        title={mainQuestion.categoryQuestion}
        options={mainQuestion.subCategoryNames.map((s) => s.name)}
        onAnswer={(val) => handleAnswer('L0', val)}
        selected={answers.L0}
      />

      {/* sub 질문 */}
      {answers.L0 && (
        <div key={answers.L0}>
          {currentSet?.map((q, idx) => {
            const canShowPrevLevels =
              idx === 0 || currentSet.slice(0, idx).every((prevQ) => answers[prevQ.level]);
            if (!canShowPrevLevels) return null;

            const MotionWrapper = motion.div;
            return (
              <MotionWrapper
                key={q.level}
                initial={{ marginTop: -20, opacity: 0, height: 0 }}
                animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
              >
                {q.type === 'CHOICE' ? (
                  <OnboardingChoiceQuestion
                    level={q.level}
                    title={q.content}
                    options={q.options.map((o) => o.content)}
                    onAnswer={(val) => handleAnswer(q.level, val)}
                    selected={answers[q.level]}
                  />
                ) : (
                  <OnboardingTextQuestion
                    level={q.level}
                    title={q.content}
                    onAnswer={(val) => handleAnswer(q.level, val)}
                  />
                )}
              </MotionWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
};
