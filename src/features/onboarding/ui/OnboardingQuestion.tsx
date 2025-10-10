import { cn } from '@/shared/lib/utils';

/**
 *  @TODO : 추후에 Button 또는 Chip 컴포넌트로 바뀔 것 같음
 *  */
interface OnboardingChoiceQuestionProps {
  level: string;
  title: string;
  options: string[];
  onAnswer: (value: string) => void;
  selected?: string | null;
}

interface OnboardingTextQuestionProps {
  level: string;
  title: string;
  placeholder?: string;
  onAnswer: (value: string) => void;
}

export const OnboardingChoiceQuestion = ({
  level,
  title,
  options,
  onAnswer,
  selected,
}: OnboardingChoiceQuestionProps) => {
  const handleClick = (option: string) => {
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
              selected === option
                ? 'bg-gray-300 border-gray-400'
                : 'bg-white hover:bg-gray-100 border-gray-300',
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export const OnboardingTextQuestion = ({
  level,
  title,
  placeholder,
  onAnswer,
}: OnboardingTextQuestionProps) => {
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
