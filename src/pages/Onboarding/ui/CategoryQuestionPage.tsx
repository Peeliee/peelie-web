import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetAllSubQuestions } from '@/entities/category/api/category.queries';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';
import { categoryKeys } from '@/entities/category/api/category.queries';
import { cn } from '@/shared/lib/utils';

interface CategoryQuestionPageProps {
  selected: number[];
  onNext: () => void;
}

const CategoryQuestionPage = ({ selected, onNext }: CategoryQuestionPageProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentCategoryId = selected[currentIndex];

  // main 질문
  const { data: mainQuestion, isLoading: isMainLoading } = useQuery(
    categoryKeys.mainQuestion(currentCategoryId),
  );

  // sub 질문
  const { subQuestions, isLoading: isSubLoading } = useGetAllSubQuestions(currentCategoryId);

  const [answers, setAnswers] = useState<Record<number, Record<string, string>>>({});
  console.log(answers);
  const handleAnswersChange = (categoryId: number, newAnswers: Record<string, string>) => {
    setAnswers((prev) => ({
      ...prev,
      [categoryId]: newAnswers,
    }));
  };

  const handleNext = async () => {
    const isLast = currentIndex === selected.length - 1;

    if (isLast) {
      console.log('최종 저장:', answers);
      onNext();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentAnswers = answers[currentCategoryId] || {};
  const totalQuestions = 5;
  const answeredCount = Object.keys(currentAnswers).length;
  const isCompleted = answeredCount >= totalQuestions && totalQuestions > 0;

  if (isSubLoading || isMainLoading || !mainQuestion || !subQuestions) {
    return <div className="text-center mt-20">질문 불러오는 중...</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col px-6 py-10 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-2">선택한 카테고리에 대해 이야기해볼까요?</h1>
        <p className="text-gray-500 text-sm">
          작성한 내용은 바로 전체 공개되지 않고,
          <br />
          단계별 정보 공개에 사용돼요.
        </p>
      </div>

      {subQuestions && (
        <OnboardingQuestionForm
          mainQuestion={mainQuestion.data}
          subQuestions={subQuestions}
          isSubLoading={isSubLoading}
          onChange={(newAnswers) => handleAnswersChange(currentCategoryId, newAnswers)}
          initialAnswers={currentAnswers}
        />
      )}

      <button
        onClick={handleNext}
        className={cn(
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

export default CategoryQuestionPage;
