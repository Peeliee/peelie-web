import { cn } from '@/shared/lib/utils';

type SpeechBubbleVariant = 'primary' | 'secondary' | 'gray';
type TailPosition = 'center' | 'bottom-left' | 'left';

interface SpeechBubbleProps {
  variant?: SpeechBubbleVariant;
  tailPosition?: TailPosition;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<SpeechBubbleVariant, string> = {
  primary: 'bg-peelie-primary-600 text-peelie-gray-000',
  secondary: 'bg-peelie-secondary-100 text-peelie-gray-900',
  gray: 'bg-peelie-gray-150 text-peelie-gray-900',
};

const tailStyles: Record<TailPosition, string> = {
  center: 'after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px]',
  'bottom-left': 'after:left-[20px] after:bottom-[-10px]',
  left: 'after:left-[-10px] after:top-1/2 after:-translate-y-1/2',
};

export const SpeechBubble = ({
  variant = 'primary',
  tailPosition = 'center',
  children,
  className,
}: SpeechBubbleProps) => {
  return (
    <div
      className={cn(
        'relative inline-block px-6 py-4 rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] body-1-bold',
        'after:content-[""] after:absolute after:w-0 after:h-0 after:border-solid',
        variantStyles[variant],
        // 꼭지점 방향에 따라 삼각형 모양 다르게
        tailPosition === 'center' &&
          'after:border-x-[10px] after:border-x-transparent after:border-t-[10px]',
        tailPosition === 'bottom-left' &&
          'after:border-x-[10px] after:border-x-transparent after:border-t-[10px]',
        tailPosition === 'left' &&
          'after:border-y-[10px] after:border-y-transparent after:border-r-[10px]',
        // tail 위치
        tailStyles[tailPosition],
        // 색상별로 삼각형 색도 맞추기
        tailPosition !== 'left'
          ? variant === 'primary'
            ? 'after:border-t-peelie-primary-600'
            : variant === 'secondary'
              ? 'after:border-t-peelie-secondary-100'
              : 'after:border-t-peelie-gray-150'
          : variant === 'primary'
            ? 'after:border-peelie-primary-600'
            : variant === 'secondary'
              ? 'after:border-peelie-secondary-100'
              : 'after:border-peelie-gray-150',
        className,
      )}
    >
      {children}
    </div>
  );
};
