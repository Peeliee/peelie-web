import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

export type SpeechBubbleVariant = 'primary' | 'secondary' | 'gray' | 'fast' | 'balanced' | 'cautious';
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
  fast: 'bg-peelie-positive-600 text-peelie-white',
  balanced: 'bg-peelie-secondary-200 text-peelie-white',
  cautious: 'bg-peelie-primary-500 text-peelie-white',
};

const tailStyles: Record<TailPosition, string> = {
  center: 'after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px]',
  'bottom-left': 'after:left-[20px] after:bottom-[-10px]',
  left: 'after:left-[-10px] after:top-1/2 after:-translate-y-1/2',
};

// tail 방향별 border 스타일
const tailBorderStyles: Record<TailPosition, string> = {
  center: 'after:border-x-[10px] after:border-x-transparent after:border-t-[10px]',
  'bottom-left': 'after:border-x-[10px] after:border-x-transparent after:border-t-[10px]',
  left: 'after:border-y-[10px] after:border-y-transparent after:border-r-[10px]',
};

// variant별 tail 색상
const tailColorStyles: Record<SpeechBubbleVariant, Record<TailPosition, string>> = {
  primary: {
    center: 'after:border-t-peelie-primary-600',
    'bottom-left': 'after:border-t-peelie-primary-600',
    left: 'after:border-r-peelie-primary-600',
  },
  secondary: {
    center: 'after:border-t-peelie-secondary-100',
    'bottom-left': 'after:border-t-peelie-secondary-100',
    left: 'after:border-r-peelie-secondary-100',
  },
  gray: {
    center: 'after:border-t-peelie-gray-150',
    'bottom-left': 'after:border-t-peelie-gray-150',
    left: 'after:border-r-peelie-gray-150',
  },
  fast: {
    center: 'after:border-t-peelie-positive-600',
    'bottom-left': 'after:border-t-peelie-positive-600',
    left: 'after:border-r-peelie-positive-600',
  },
  balanced: {
    center: 'after:border-t-peelie-secondary-200',
    'bottom-left': 'after:border-t-peelie-secondary-200',
    left: 'after:border-r-peelie-secondary-200',
  },
  cautious: {
    center: 'after:border-t-peelie-primary-500',
    'bottom-left': 'after:border-t-peelie-primary-500',
    left: 'after:border-r-peelie-primary-500',
  },
};

// 말풍선 공통 컴포넌트
export const SpeechBubble = ({
  variant = 'primary',
  tailPosition = 'center',
  children,
  className,
}: SpeechBubbleProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 12,
        duration: 0.8,
      }}
      className={cn(
        'relative inline-block px-4 py-4 rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
        'after:content-[""] after:absolute after:w-0 after:h-0 after:border-solid',
        variantStyles[variant],
        tailBorderStyles[tailPosition],
        tailStyles[tailPosition],
        tailColorStyles[variant][tailPosition],
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
