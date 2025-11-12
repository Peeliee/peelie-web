import { cn } from '@/shared/lib/utils';

interface StatusProgressProps {
  currentStep: number;
  className?: string;
}

export function StatusProgress({ currentStep, className }: StatusProgressProps) {
  const total = 4;
  const activeColors = [
    'bg-peelie-primary-300',
    'bg-peelie-primary-400',
    'bg-peelie-primary-500',
    'bg-peelie-primary-600',
  ];

  return (
    <div
      className={cn(
        'relative w-full h-3 bg-peelie-gray-200 rounded-400 overflow-hidden',
        className,
      )}
    >
      <div className="flex w-full h-full gap-0.5">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i < currentStep;
          return (
            <div
              key={i}
              className={cn(
                'flex-1 h-full transition-all duration-500 ease-in-out origin-left',
                isActive ? activeColors[i] : 'bg-peelie-gray-200',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
