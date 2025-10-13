import { motion } from 'framer-motion';
import { useAnswerState } from '@/features/onboarding/hooks/useAnswerState';
import {
  groupSubQuestions,
  getActiveQuestionSet,
  isAllPreviousAnswered,
} from '@/features/onboarding/utils/categoryQuestionUtils';
import {
  OnboardingChoiceQuestion,
  OnboardingTextQuestion,
} from '@/entities/onboarding/ui/OnboardingQuestion';
import type {
  CategoryMainQuestion,
  CategorySubQuestion,
} from '@/entities/category/model/category.type';
import { cn } from '@/shared/lib/utils';

interface CategoryQuestionFormProps {
  mainQuestion: CategoryMainQuestion;
  subQuestions?: CategorySubQuestion[];
  isSubLoading?: boolean;
  onChange?: (answers: Record<string, string>) => void;
  onSubmit?: (answers: Record<string, string>) => void;
  initialAnswers?: Record<string, string>;
}

export const CategoryQuestionForm = ({
  mainQuestion,
  subQuestions,
  isSubLoading,
  initialAnswers = {},
  onChange,
  onSubmit,
}: CategoryQuestionFormProps) => {
  const { answers, updateAnswer } = useAnswerState(initialAnswers, onChange);

  const grouped = groupSubQuestions(subQuestions);
  const activeQuestionSet = getActiveQuestionSet(answers, mainQuestion, grouped);

  if (isSubLoading || !subQuestions) {
    return <div className="text-center mt-20">질문 불러오는 중...</div>;
  }

  const totalQuestions = activeQuestionSet.length + 1;
  const answeredCount = Object.keys(answers).length;
  const isCompleted = answeredCount >= totalQuestions;

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
            !isAllPreviousAnswered(idx, activeQuestionSet, answers) ? null : (
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
      <button
        onClick={() => onSubmit?.(answers)}
        disabled={!isCompleted}
        className={cn(
          // 'w-full py-4 rounded-full font-medium mt-8',
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          isCompleted
            ? 'bg-orange-400 text-white active:bg-orange-500'
            : 'bg-gray-200 text-gray-400 pointer-events-none',
        )}
      >
        계속하기
      </button>
    </div>
  );
};
