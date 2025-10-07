import { cn } from '@/shared/lib/utils';

interface StepProgressProps {
  currentStep: number;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  // 내부에서 색상 정의
  const stepColors = [
    'var(--color-peelie-primary-900)',
    'var(--color-peelie-primary-600)',
    'var(--color-peelie-positive-600)',
    'var(--color-peelie-secondary-200)',
  ];

  const labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const progressPercent = Math.min(100, 5 + ((currentStep - 1) / (labels.length - 1)) * 100);

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        {/* 전체 gradient */}
        <div
          className={cn(
            'absolute inset-0 h-2 rounded-full',
            // 'bg-gradient-to-r from-peelie-primary-900 via-peelie-primary-600 via-peelie-positive-600 to-peelie-secondary-200',
          )}
          style={{
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
          }}
        />
        {/* 가려지는 부분 */}
        <div
          className="absolute right-0 top-0 h-1.5 bg-gray-200 transition-all rounded-[999px]"
          style={{
            width: `${100 - progressPercent}%`,
            maskImage:
              'radial-gradient(circle 4px at left center, transparent 0, transparent 4px, black 4px)',
            WebkitMaskImage:
              'radial-gradient(circle 4px at left center, transparent 0, transparent 4px, black 4px)',
          }}
        />
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-2 detail-regular">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-1 h-1 rounded-full transition-colors bg-gray-200"
              style={{ backgroundColor: i + 1 <= currentStep ? stepColors[i] : undefined }}
            />
            <span
              key={i}
              className={cn(
                'transition-colors',
                i + 1 <= currentStep ? 'font-medium' : 'text-gray-400',
              )}
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
}
