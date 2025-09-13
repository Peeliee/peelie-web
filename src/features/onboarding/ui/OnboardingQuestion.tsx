import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 *  @TODO : 추후에 Button 또는 Chip 컴포넌트로 바뀔 것 같음
 *  @level : 이것도 타입 미정이라 임의로 number 처리
 *  */
interface OnboardingQuestionProps {
  level: number;
  title: string;
  options?: string[];
  onAnswer: (value: string) => void;
}

export const OnboardingQuestion = ({ level, title, options, onAnswer }: OnboardingQuestionProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (option: string) => {
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div>
      <h2>
        {level}. {title}
      </h2>
      <div>
        {options?.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={cn(
              'px-3 py-1 rounded-full border hover:bg-gray-100',
              `${selected === option ? 'bg-gray-200' : 'hover:bg-gray-100'}`,
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
