import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

import { QuizForm } from '@/features/quiz/ui/QuizForm';
import { quizQuery } from '@/entities/quiz/api/quiz.queries';

const QuizPage = () => {
  const { id } = useParams(); // "/friend/:userId/quiz"

  // 2) query params
  const [searchParams] = useSearchParams();
  const stage = searchParams.get('stage');

  const parsedUserId = Number(id);
  const parsedStage = Number(stage);

  console.log("userId : ", id)
  console.log('parsedUserId : ', parsedUserId, 'parsedStage : ', parsedStage);
  const { data, isLoading, isError } = useQuery(
    quizQuery.quizList({ userId: parsedUserId, stage: parsedStage }),
  );

  if (isNaN(parsedUserId) || isNaN(parsedStage)) {
    console.log('좆버그');
    return <div>잘못된 URL 파라미터</div>;
  }

  if (isLoading) return <div>로딩중...</div>;

  if (isError || !data) return <div>퀴즈 불러오기 실패</div>;

  return (
    <div>
      <div>
        <QuizForm
          quizList={data.data}
          onFinish={() => {
            console.log('퀴즈 완료!');
          }}
          onSubmit={(answers) => {
            console.log('유저 답변 기록:', answers);
          }}
        />
      </div>
    </div>
  );
};

export default QuizPage;
