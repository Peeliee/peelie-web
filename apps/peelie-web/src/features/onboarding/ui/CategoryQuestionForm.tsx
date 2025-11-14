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
import { Button } from '@/shared/ui/common/button';

interface AnswerLevels {
  L0?: number;
  L1?: number;
  L2?: number;
  L3?: number;
  L4?: string;
}

interface CategoryQuestionFormProps {
  mainQuestion: CategoryMainQuestion;
  subQuestions?: CategorySubQuestion[];
  isSubLoading?: boolean;
  onChange?: (answers: AnswerLevels) => void;
  onSubmit?: (answers: AnswerLevels) => void;
  initialAnswers?: AnswerLevels;
  isPending: boolean;
}

export const CategoryQuestionForm = ({
  mainQuestion,
  subQuestions,
  isSubLoading,
  initialAnswers = {},
  onChange,
  onSubmit,
  isPending,
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
    <div className="space-y-6 mt-6 mb-6">
      {/* main 질문 */}
      <OnboardingChoiceQuestion
        title={mainQuestion.categoryQuestion}
        options={mainQuestion.subCategoryNames.map((s) => ({ id: s.id, label: s.name }))}
        onAnswer={(optionId) => updateAnswer('L0', optionId)}
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
                    title={q.content}
                    options={q.options.map((o) => ({ id: o.optionId, label: o.content }))}
                    onAnswer={(val) => updateAnswer(q.level, val)}
                    selected={answers[q.level] as number}
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
      <Button
        variant={'primary'}
        size={'extraLarge'}
        onClick={() => onSubmit?.(answers)}
        disabled={!isCompleted}
        className={cn('fixed bottom-10 inset-x-4')}
      >
        {isPending ? '...로딩 중' : '계속하기'}
      </Button>
    </div>
  );
};
