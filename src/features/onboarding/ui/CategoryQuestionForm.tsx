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
import { cn } from '@/shared/lib/utils';

interface CategoryQuestionFormProps {
  mainQuestion: CategoryMainQuestion;
  subQuestions?: CategorySubQuestion[];
  isSubLoading?: boolean;
  onChange?: (answers: Record<string, string>) => void;
  onSubmit?: (answers: Record<string, string>) => void;
  initialAnswers?: Record<string, string>;
}

/**
 * @CategoryQuestionForm
 *
 * 단일 카테고리에 대한 온보딩 질문 폼입니다.
 *
 * 이 컴포넌트는 사용자의 선택 흐름에 따라 질문을 단계적으로 표시하고,
 * 응답 상태를 관리하며, 모든 질문이 완료되면 상위로 결과를 전달합니다.
 *
 * 주요 역할:
 * - `mainQuestion`(L0)과 `subQuestions`(L1~L4)를 순차적으로 렌더링
 * - 이전 단계가 완료되어야 다음 질문이 노출되는 단계적 인터랙션 제어
 * - 내부 상태(`answers`)를 통해 사용자의 응답 저장 및 실시간 업데이트
 * - 모든 질문 완료 시 `onSubmit(answers)` 호출로 상위 단계로 응답 전달
 *
 * 내부 구성:
 * - `useOnboardingFormController`: 질문 세트 활성화 및 답변 상태 제어 훅
 * - `OnboardingChoiceQuestion`, `OnboardingTextQuestion`: 개별 질문 UI 엔티티
 */
export const CategoryQuestionForm = ({
  mainQuestion,
  subQuestions,
  isSubLoading,
  initialAnswers = {},
  onChange,
  onSubmit,
}: CategoryQuestionFormProps) => {
  const { answers, updateAnswer, activeQuestionSet, isNextQuestionVisible } =
    useOnboardingFormController(mainQuestion, subQuestions, initialAnswers, onChange);

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
