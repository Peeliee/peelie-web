import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const chipVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-full font-medium transition-all select-none',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        red: '',
      },
      chipType: {
        subtle: '',
        outline: 'border',
        default: '',
      },
      size: {
        small: 'h-5 px-[6px] rounded-400 body-2-regular',
        medium: 'h-6 px-2 rounded-400 body-1-regular',
        large: 'h-8 px-3 rounded-400 body-1-regular',
      },
    },
    defaultVariants: {
      variant: 'primary',
      chipType: 'default',
      size: 'medium',
    },
    compoundVariants: [
      // Primary
      {
        variant: 'primary',
        chipType: 'default',
        class: cn('bg-peelie-primary-600 text-peelie-white'),
      },
      {
        variant: 'primary',
        chipType: 'outline',
        class: cn('bg-peelie-primary-100 border-peelie-primary-600 text-peelie-primary-600'),
      },
      {
        variant: 'primary',
        chipType: 'subtle',
        class: cn('bg-peelie-primary-100 text-peelie-primary-600'),
      },

      // Secondary
      {
        variant: 'secondary',
        chipType: 'default',
        class: cn('bg-peelie-gray-900 text-peelie-white'),
      },
      {
        variant: 'secondary',
        chipType: 'outline',
        class: cn('bg-peelie-gray-200 border-peelie-gray-950 text-peelie-gray-950'),
      },
      {
        variant: 'secondary',
        chipType: 'subtle',
        class: cn('bg-peelie-gray-200 text-peelie-gray-950'),
      },

      // === Red ===
      {
        variant: 'red',
        chipType: 'default',
        class: cn('bg-peelie-error-200 text-peelie-white'),
      },
      {
        variant: 'red',
        chipType: 'outline',
        class: cn('bg-peelie-error-100 border-peelie-error-200 text-peelie-error-200'),
      },
      {
        variant: 'red',
        chipType: 'subtle',
        class: cn('bg-peelie-error-100 text-peelie-error-200'),
      },
    ],
  },
);

interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Chip({
  className,
  variant,
  chipType,
  size,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant, chipType, size, className }))} {...props}>
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </div>
  );
}
