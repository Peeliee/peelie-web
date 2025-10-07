import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-400 transition-all select-none w-12 h-5 detail-regular',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        red: '',
        gray: '',
        green: '',
      },
      badgeType: {
        fill: '',
        outline: 'border',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      badgeType: 'fill',
    },
    compoundVariants: [
      // === PRIMARY ===
      {
        variant: 'primary',
        badgeType: 'fill',
        class: cn('bg-peelie-primary-600 text-peelie-white'),
      },
      {
        variant: 'primary',
        badgeType: 'outline',
        class: cn('border-peelie-primary-600 bg-peelie-primary-100 text-peelie-primary-600'),
      },
      {
        variant: 'primary',
        badgeType: 'ghost',
        class: cn('text-peelie-primary-600 bg-transparent'),
      },

      // === SECONDARY ===
      {
        variant: 'secondary',
        badgeType: 'fill',
        class: cn('bg-peelie-secondary-200 text-peelie-white'),
      },
      {
        variant: 'secondary',
        badgeType: 'outline',
        class: cn('border-peelie-secondary-200 text-peelie-secondary-200 bg-peelie-secondary-100'),
      },
      {
        variant: 'secondary',
        badgeType: 'ghost',
        class: cn('text-peelie-secondary-200 bg-transparent'),
      },

      // === RED ===
      {
        variant: 'red',
        badgeType: 'fill',
        class: cn('bg-peelie-error-200 text-peelie-white'),
      },
      {
        variant: 'red',
        badgeType: 'outline',
        class: cn('border-peelie-error-200 text-peelie-error-200 bg-peelie-error-100'),
      },
      {
        variant: 'red',
        badgeType: 'ghost',
        class: cn('text-peelie-error-200 bg-transparent'),
      },

      // === GRAY ===
      {
        variant: 'gray',
        badgeType: 'fill',
        class: cn('bg-peelie-gray-700 text-peelie-white'),
      },
      {
        variant: 'gray',
        badgeType: 'outline',
        class: cn('border-peelie-gray-700 text-peelie-gray-700 bg-peelie-gray-200'),
      },
      {
        variant: 'gray',
        badgeType: 'ghost',
        class: cn('text-peelie-gray-700 bg-transparent'),
      },

      // === GREEN ===
      {
        variant: 'green',
        badgeType: 'fill',
        class: cn('bg-peelie-positive-600 text-peelie-white'),
      },
      {
        variant: 'green',
        badgeType: 'outline',
        class: cn('border-peelie-green-600 text-peelie-green-600 bg-peelie-positive-100'),
      },
      {
        variant: 'green',
        badgeType: 'ghost',
        class: cn('text-peelie-green-600 bg-transparent'),
      },
    ],
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, badgeType, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, badgeType, className }))} {...props}>
      {children}
    </div>
  );
}

export { badgeVariants };
