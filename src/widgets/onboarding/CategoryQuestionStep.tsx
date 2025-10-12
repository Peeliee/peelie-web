import { useQuery } from '@tanstack/react-query';
import { categoryKeys } from '@/entities/category/api/category.queries';
import { CategoryQuestionForm } from '@/features/onboarding/ui/CategoryQuestionForm';
import { useGetAllSubQuestions } from '@/entities/category/api/category.queries';

const CategoryQuestionStep = ({
  categoryId,
  onSubmit,
}: {
  categoryId: number;
  onSubmit: (answers: Record<string, string>) => void;
}) => {
  const { data: mainQuestion, isLoading: isMainLoading } = useQuery(
    categoryKeys.mainQuestion(categoryId),
  );

  const { subQuestions, isLoading: isSubLoading } = useGetAllSubQuestions(categoryId);

  if (isMainLoading || isSubLoading || !mainQuestion || !subQuestions) {
    return <div className="text-center mt-20">질문 불러오는 중...</div>;
  }

  return (
    <CategoryQuestionForm
      mainQuestion={mainQuestion.data}
      subQuestions={subQuestions}
      onSubmit={onSubmit}
    />
  );
};

export default CategoryQuestionStep;
