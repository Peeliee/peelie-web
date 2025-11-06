import { cn } from '@/shared/lib/utils';

interface StepProgressProps {
  currentStep: number;
}

// TODO : 색상 알맞게 수정하기 (현재는 프로그레스가 작아도 모든 색상이 다뜸)
export const StepProgress = ({ currentStep }: StepProgressProps) => {
  const stepColors = [
    'var(--color-peelie-primary-900)',
    'var(--color-peelie-primary-600)',
    'var(--color-peelie-positive-600)',
    'var(--color-peelie-secondary-200)',
  ];
  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const progressMap = [25, 60, 80, 100];
  const progressPercent = progressMap[currentStep - 1];

  return (
    <div className="w-full">
      <div className="relative h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 h-full rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: `
                linear-gradient(
                to right,
                var(--color-peelie-primary-900) 0%,
                var(--color-peelie-primary-900) 10%,
                var(--color-peelie-primary-600) 30%,
                var(--color-peelie-primary-600) 40%,
                var(--color-peelie-positive-600) 60%,
                var(--color-peelie-positive-600) 65%,
                var(--color-peelie-secondary-200) 85%,
                var(--color-peelie-secondary-200) 100%
                )
            `,
            maskImage: `linear-gradient(to right, black ${progressPercent}%, transparent ${progressPercent}%)`,
            WebkitMaskImage: `linear-gradient(to right, black ${progressPercent}%, transparent ${progressPercent}%)`,
          }}
        />
      </div>

      <div className="flex justify-between mt-2 detail-regular">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-1 h-1 rounded-full transition-colors"
              style={{
                backgroundColor:
                  i + 1 <= currentStep ? stepColors[i] : 'var(--color-peelie-gray-200)',
              }}
            />
            <span
              className={cn('transition-colors', {
                'text-peelie-gray-200': i + 1 > currentStep,
              })}
              style={{
                color: i + 1 <= currentStep ? stepColors[i] : undefined,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
