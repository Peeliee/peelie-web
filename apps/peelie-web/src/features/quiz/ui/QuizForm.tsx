import { useState } from 'react';
import { QuizCard } from '@/entities/quiz/ui/QuizCard';
interface QuizOption {
  optionId: number;
  text: string;
}

// 퀴즈
interface Quiz {
  quizId: number;
  quiz: string;
  answer: QuizOption[];
}

interface QuizFormProps {
  quizList: Quiz[];
  onSubmit: (answers: { quizId: number; optionId: number }[]) => void;
  onFinish: () => void;
}

export const QuizForm = ({ quizList, onFinish }: QuizFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isGrading, setIsGrading] = useState(false);

  const currentQuiz = quizList[currentIndex];

  const handleConfirm = () => {
    if (selected === null) return; // 선택 안했으면 무시

    setIsGrading(true);

    const isCorrect = selected === currentQuiz.answerId;
    console.log(isCorrect)
    // 정답/오답 모달 애니메이션 보여주고 싶으면 여기서 처리
    setTimeout(() => {
      setIsGrading(false);

      // 정답 여부와 관계없이 다음 문제로 이동
      const nextIndex = currentIndex + 1;

      if (nextIndex < quizList.length) {
        setCurrentIndex(nextIndex);
        setSelected(null); // 다음 문제 선택 초기화
      } else {
        onFinish(); // 모든 퀴즈 완료
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="text-center text-[20px] font-semibold mb-2">
        {currentIndex + 1}/{quizList.length}
      </div>

      <QuizCard
        question={currentQuiz.quiz}
        options={currentQuiz.answer}
        selectedOptionId={selected}
        onSelectOption={setSelected}
      />

      <button
        onClick={handleConfirm}
        disabled={selected === null || isGrading}
        className="w-full mt-6 bg-gradient-to-r from-[#FFB54C] to-[#FF8A00] text-white text-[18px] font-semibold py-4 rounded-2xl disabled:opacity-50"
      >
        확인하기
      </button>
    </div>
  );
};
