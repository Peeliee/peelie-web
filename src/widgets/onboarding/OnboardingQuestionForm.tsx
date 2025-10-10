import { motion } from 'framer-motion';
import { useOnboardingFormController } from '@/features/onboarding/hooks/useOnboardingFormController';
import {
  OnboardingChoiceQuestion,
  OnboardingTextQuestion,
} from '@/entities/onboarding/ui/OnboardingQuestion';
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
  const { answers, updateAnswer, activeQuestionSet, isNextQuestionVisible } =
    useOnboardingFormController(mainQuestion, subQuestions, initialAnswers, onChange);

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
        onAnswer={(val) => updateAnswer('L0', val)}
        selected={answers.L0}
      />

      {/* sub 질문 */}
      {answers.L0 && (
        <div key={answers.L0}>
          {activeQuestionSet.map((q, idx) =>
            !isNextQuestionVisible(idx) ? null : (
              <motion.div
                key={q.level}
                initial={{ marginTop: -20, opacity: 0, height: 0 }}
                animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
              >
                {q.type === 'CHOICE' ? (
                  <OnboardingChoiceQuestion
                    level={q.level}
                    title={q.content}
                    options={q.options.map((o) => o.content)}
                    onAnswer={(val) => updateAnswer(q.level, val)}
                    selected={answers[q.level]}
                  />
                ) : (
                  <OnboardingTextQuestion
                    level={q.level}
                    title={q.content}
                    onAnswer={(val) => updateAnswer(q.level, val)}
                  />
                )}
              </motion.div>
            ),
          )}
        </div>
      )}
    </div>
  );
};
