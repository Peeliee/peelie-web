import { useQuery } from '@tanstack/react-query';
import { categoryKeys } from '@/entities/category/api/category.queries';
import { CategoryQuestionForm } from '@/features/onboarding/ui/CategoryQuestionForm';
import { useGetAllSubQuestions } from '@/entities/category/api/category.queries';

/**
 * @CategoryQuestionStep
 *
 * 온보딩 퍼널의 한 단계로, 단일 카테고리에 대한 질문 세트를 처리하는 컴포넌트입니다.
 *
 * - 지정된 `categoryId`로 mainQuestion / subQuestions 데이터를 요청합니다.
 * - 질문 로딩 상태를 관리하고, 로딩 완료 시 CategoryQuestionForm 을 렌더링합니다.
 * - 모든 질문에 대한 응답이 완료되면 상위 퍼널로 onSubmit(answers) 를 호출합니다.
 */

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
