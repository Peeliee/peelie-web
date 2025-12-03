import { cn } from '@/shared/lib/utils';
import { Chip } from '@/shared/ui/common/Chip/Chip';
import { Button } from '@/shared/ui/common/button';

interface ChoiceOption {
  id: number;
  label: string;
}

interface OnboardingChoiceQuestionProps {
  title: string;
  options: ChoiceOption[];
  onAnswer: (id: number) => void;
  selected?: number | null;
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
  title,
  options,
  onAnswer,
  selected,
}: OnboardingChoiceQuestionProps) => {
  const MAX_CHIP_LENGTH = 14;
  const hasLongOption = options.some((opt) => opt.label.length > MAX_CHIP_LENGTH);

  return (
    <div>
      <p className="heading-4-medium py-3">{title}</p>
      <div
        className={cn('pt-4 pb-6', hasLongOption ? 'flex flex-col gap-4' : 'flex flex-wrap gap-2')}
      >
        {options.map((option) => {
          const isSelected = selected === option.id;

          // 전체 Button
          if (hasLongOption) {
            return (
              <Button
                key={option.id}
                variant={'primary'}
                size={'large'}
                buttonType={isSelected ? 'fill' : 'outline'}
                onClick={() => onAnswer(option.id)}
                className={cn('w-full justify-center')}
              >
                {option.label}
              </Button>
            );
          }

          // 전체 Chip
          return (
            <Chip
              key={option.id}
              size={'large'}
              variant="primary"
              chipType={isSelected ? 'default' : 'subtle'}
              onClick={() => onAnswer(option.id)}
            >
              {option.label}
            </Chip>
          );
        })}
      </div>
    </div>
  );
};

export const OnboardingTextQuestion = ({
  title,
  placeholder,
  onAnswer,
}: OnboardingTextQuestionProps) => {
  return (
    <div>
      <h2>{title}</h2>
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
