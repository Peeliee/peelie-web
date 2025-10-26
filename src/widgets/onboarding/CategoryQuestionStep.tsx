import { useQuery, useMutation } from '@tanstack/react-query';

import { categoryKeys } from '@/entities/category/api/category.queries';
import { CategoryQuestionForm } from '@/features/onboarding/ui/CategoryQuestionForm';
import { useGetAllSubQuestions } from '@/entities/category/api/category.queries';
import { onboardingPut } from '@/entities/onboarding/api/onboarding-put';
import { convertAnswersToDTO } from '@/features/onboarding/utils/categoryQuestionUtils';

interface AnswerLevels {
  L0?: number;
  L1?: number;
  L2?: number;
  L3?: number;
  L4?: string;
}

const CategoryQuestionStep = ({
  categoryId,
  onNext,
}: {
  categoryId: number;
  onNext: () => void;
}) => {
  const { data: mainQuestion, isLoading: isMainLoading } = useQuery(
    categoryKeys.mainQuestion(categoryId),
  );

  const { subQuestions, isLoading: isSubLoading } = useGetAllSubQuestions(categoryId);

  const { mutate: answerCategoryQuestion, isPending } = useMutation({
    mutationFn: onboardingPut.answerCategoryQuestion,
    onSuccess: () => {
      console.log('카테고리 답변 저장 성공');
      onNext();
    },
    onError: (err) => {
      console.error('카테고리 답변 저장 실패', err);
    },
  });

  const handleSubmit = (answers: AnswerLevels) => {
    const dto = convertAnswersToDTO(answers);
    if (!dto) return;
    answerCategoryQuestion(dto);
  };

  if (isMainLoading || isSubLoading || !mainQuestion || !subQuestions) {
    return <div className="text-center mt-20">질문 불러오는 중...</div>;
  }

  return (
    <CategoryQuestionForm
      mainQuestion={mainQuestion.data}
      subQuestions={subQuestions}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};

export default CategoryQuestionStep;
