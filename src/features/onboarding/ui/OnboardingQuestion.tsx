import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 *  @TODO : 추후에 Button 또는 Chip 컴포넌트로 바뀔 것 같음
 *  @level : 이것도 타입 미정이라 임의로 number 처리
 *  */
interface OnboardingObjectQuestionProps {
  level: number;
  title: string;
  options: string[];
  onAnswer: (value: string) => void;
}

interface OnboardingSubjectQuestionProps {
  level: number;
  title: string;
  placeholder?: string;
  onAnswer: (value: string) => void;
}

export const OnboardingObjectQuestion = ({
  level,
  title,
  options,
  onAnswer,
}: OnboardingObjectQuestionProps) => {
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
        {options.map((option) => (
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

export const OnboardingSubjectQuestion = ({
  level,
  title,
  placeholder,
  onAnswer,
}: OnboardingSubjectQuestionProps) => {
  return (
    <div>
      <h2>
        {level}. {title}
      </h2>
      <div className="mt-2">
        <input
          type="text"
          placeholder={placeholder ?? '입력하세요'}
          onChange={(e) => onAnswer(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>
    </div>
  );
};
