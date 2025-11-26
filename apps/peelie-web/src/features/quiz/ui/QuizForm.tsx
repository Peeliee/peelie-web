import { useState } from 'react';
import { QuizCard } from '@/entities/quiz/ui/QuizCard';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/common/button';
import { QuizModal } from '@/shared/ui/common/Modal/ModalPresets';

interface QuizOption {
  optionId: number;
  text: string;
}

interface Quiz {
  quizId: number;
  quiz: string;
  answerId: number;
  answer: QuizOption[];
}

interface QuizFormProps {
  quizList: Quiz[];
  onFinish: () => void;
  className?: string;
}

export const QuizForm = ({ quizList, onFinish, className }: QuizFormProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const currentQuiz = quizList[currentIndex];

  const handleConfirm = () => {
    if (selected === null) return;

    const isCorrect = selected === currentQuiz.answerId;

    if (isCorrect) {
      setShowCorrectModal(true);
    } else {
      setShowWrongModal(true);
    }
  };

  const handleNextQuestion = () => {
    setShowCorrectModal(false);
    setSelected(null);

    const next = currentIndex + 1;
    if (next < quizList.length) {
      setCurrentIndex(next);
    } else {
      onFinish();
    }
  };

  // 오답: 다시 풀기
  const handleRetry = () => {
    setShowWrongModal(false);
    setSelected(null);
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="heading-1-medium text-center text-peelie-gray-600 mb-2">
        <span className="text-peelie-primary-600">{currentIndex + 1}</span>/{quizList.length}
      </div>

      <QuizCard
        question={currentQuiz.quiz}
        options={currentQuiz.answer}
        selectedOptionId={selected}
        onSelectOption={setSelected}
      />

      <Button
        variant={'primary'}
        buttonType={'fill'}
        size="extraLarge"
        onClick={handleConfirm}
        disabled={selected === null}
        className="w-full mt-6"
      >
        확인하기
      </Button>

      <QuizModal
        answer={true}
        open={showCorrectModal}
        onClose={() => setShowCorrectModal(false)}
        onClick={handleNextQuestion}
      />

      {/* 오답 모달 */}
      <QuizModal
        answer={false}
        open={showWrongModal}
        onClose={() => setShowWrongModal(false)}
        onClick={handleRetry}
      />
    </div>
  );
};
