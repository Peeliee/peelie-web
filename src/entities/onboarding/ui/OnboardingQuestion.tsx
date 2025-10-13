import { cn } from '@/shared/lib/utils';

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

/**
 *  온보딩 질문 컴포넌트입니다.
 *  @객관식질문 OnboardingChoiceQuestion
 *  @주관식질문 OnboardingTextQuestion
 *  */
export const OnboardingChoiceQuestion = ({
  level,
  title,
  options,
  onAnswer,
  selected,
}: OnboardingChoiceQuestionProps) => {
  return (
    <div>
      <h2>
        {level}. {title}
      </h2>
      <div>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
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
