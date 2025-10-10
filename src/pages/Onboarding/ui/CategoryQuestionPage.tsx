import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { categoryKeys } from '@/entities/category/api/category.queries';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';

import { cn } from '@/shared/lib/utils';

const CategoryQuestionPage = () => {
  // const selected = [1, 2, 3]; // TODO : 나중에 외부 퍼널로 주입 예정
  // const {data: mainQuestionData, isLoading } = useQuery(categoryKeys.mainQuestion())
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalQuestions = 5;
  const answeredCount = Object.keys(answers).length;
  const isCompleted = answeredCount >= totalQuestions;

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

      <OnboardingQuestionForm onChange={setAnswers} />

      <Link
        to="/interaction-style"
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          isCompleted
            ? 'bg-orange-400 text-white active:bg-orange-500'
            : 'bg-gray-200 text-gray-400 pointer-events-none',
        )}
      >
        계속하기
      </Link>
    </div>
  );
};

export default CategoryQuestionPage;
