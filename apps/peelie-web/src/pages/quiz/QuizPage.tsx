import { QuizCard } from '@/entities/quiz/ui/QuizCard';

const QuizPage = () => {
  return (
    <div>
      <div>
        <QuizCard
          question="최근 스트레스 쌓인 김용희… 퇴근 후 딱 한 편만 본다면?"
          options={[
            { optionId: 1, text: '감정선 미친 로맨스 영화로 마음 한 번 쏟아내린다' },
            { optionId: 2, text: '아무 감정 없는 미친 액션으로 뇌를 비워버린다' },
          ]}
          selectedOptionId={1}
          onSelectOption={(id: number) => console.log('선택한 옵션:', id)}
        />
      </div>
    </div>
  );
};

export default QuizPage;
