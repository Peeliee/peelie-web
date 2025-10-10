import { useState } from 'react';
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
    const next = { ...answers, [level]: value };
    setAnswers(next);
    onChange?.(next);
  };

  if (!subQuestions || isSubLoading) {
    return <div className="text-center mt-20">질문 불러오는 중...</div>;
  }

  return (
    <div className="space-y-6">
      <OnboardingChoiceQuestion
        level="L0"
        title={mainQuestion.categoryQuestion}
        options={mainQuestion.subCategoryNames.map((s) => s.name)}
        onAnswer={(val) => handleAnswer('L0', val)}
      />
      {answers.L0 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingChoiceQuestion
            level={subQuestions[0].level}
            title={subQuestions[0].content}
            options={subQuestions[0].options.map((o) => o.content)}
            onAnswer={(val) => handleAnswer(subQuestions[0].level, val)}
          />
        </motion.div>
      )}

      {answers.L1 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingChoiceQuestion
            level={subQuestions[1].level}
            title={subQuestions[1].content}
            options={subQuestions[1].options.map((o) => o.content)}
            onAnswer={(val) => handleAnswer(subQuestions[1].level, val)}
          />{' '}
        </motion.div>
      )}

      {answers.L2 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingChoiceQuestion
            level={subQuestions[2].level}
            title={subQuestions[2].content}
            options={subQuestions[2].options.map((o) => o.content)}
            onAnswer={(val) => handleAnswer(subQuestions[2].level, val)}
          />
        </motion.div>
      )}

      {answers.L3 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingTextQuestion
            level={subQuestions[3].level}
            title={subQuestions[3].content}
            onAnswer={(val) => handleAnswer(subQuestions[3].level, val)}
          />
        </motion.div>
      )}
    </div>
  );
};
