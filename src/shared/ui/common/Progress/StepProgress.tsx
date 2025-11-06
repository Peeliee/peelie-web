import { cn } from '@/shared/lib/utils';

interface StepProgressProps {
  currentStep: number;
}

export const StepProgress = ({ currentStep }: StepProgressProps) => {
  const stepColors = [
    'var(--color-peelie-primary-900)',
    'var(--color-peelie-primary-600)',
    'var(--color-peelie-positive-600)',
    'var(--color-peelie-secondary-200)',
  ];

  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  const base = 10;
  const progressPercent = Math.min(
    100,
    base + ((currentStep - 1) / (labels.length - 1)) * (100 - base),
  );

  return (
    <div className="w-full">
      {/* 바 */}
      <div className="relative h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 h-full rounded-full"
          style={{
            background: `
              linear-gradient(
                to right,
                ${stepColors[0]} 0%,
                ${stepColors[1]} 33%,
                ${stepColors[2]} 66%,
                ${stepColors[3]} 100%
              )
            `,
            clipPath: `inset(0 ${100 - progressPercent}% 0 0 round 999px)`,
            transition: 'clip-path 0.4s ease',
          }}
        />
      </div>

      {/* 라벨 */}
      <div className="flex justify-between mt-2 detail-regular">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-1 h-1 rounded-full"
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
