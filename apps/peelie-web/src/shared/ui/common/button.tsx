import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: '',
        inactive: '',
        secondary: '',
        error: '',
      },
      buttonType: {
        fill: '',
        outline: 'border',
        ghost: 'bg-transparent border-none',
      },
      state: {
        default: '',
        disabled: '',
        pressed: '',
      },
      size: {
        small: 'h-6 px-2 rounded-400 body-1-regular',
        medium: 'h-8 px-3 rounded-400 body-1-regular',
        large: 'h-10 px-4 rounded-400 body-1-regular',
        extraLarge: 'h-12 px-6 rounded-400 heading-4-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      buttonType: 'fill',
      size: 'medium',
      state: 'default',
    },
    compoundVariants: [
      // Primary fill
      {
        variant: 'primary',
        buttonType: 'fill',
        class: cn(
          'bg-gradient-to-b from-[var(--color-peelie-secondary-200)] to-[var(--color-peelie-primary-600)] text-peelie-white',
          'disabled:bg-peelie-primary-600 disabled:opacity-32',
          'active:from-[var(--color-peelie-primary-700)] active:to-[var(--color-peelie-primary-700)]',
        ),
      },
      // Primary outline
      {
        variant: 'primary',
        buttonType: 'outline',
        class: cn(
          'bg-peelie-primary-100 border-peelie-primary-600 text-peelie-primary-600',
          'disabled:opacity-32',
          'active:bg-peelie-primary-100 active:border-peelie-primary-700 active:text-peelie-primary-700',
        ),
      },
      // Primary ghost
      {
        variant: 'primary',
        buttonType: 'ghost',
        class: cn(
          'bg-transparent text-peelie-primary-600',
          'disabled:opacity-32',
          'active:text-peelie-primary-700',
        ),
      },
      // Inactive fill
      {
        variant: 'inactive',
        buttonType: 'fill',
        class: cn(
          'bg-peelie-gray-200 text-peelie-black',
          'disabled:opacity-32',
          'active:bg-peelie-gray-500 active:text-peelie-gray-950',
        ),
      },
      // Inactive outline
      {
        variant: 'inactive',
        buttonType: 'outline',
        class: cn(
          'bg-peelie-gray-100 border-peelie-gray-200 text-peelie-black',
          'disabled:opacity-32',
          'active:bg-peelie-gray-150 active:border-gray-500 active:text-peelie-gray-950',
        ),
      },
      // Inactive ghost
      {
        variant: 'inactive',
        buttonType: 'ghost',
        class: cn(
          'bg-transparent text-peelie-gray-900',
          'disabled:opacity-32',
          'active:text-peelie-gray-950',
        ),
      },
      // Secondary fill
      {
        variant: 'secondary',
        buttonType: 'fill',
        class: cn(
          'bg-peelie-secondary-200 text-peelie-white',
          'disabled:opacity-32',
          'active:bg-peelie-secondary-300',
        ),
      },
      // Secondary outline
      {
        variant: 'secondary',
        buttonType: 'outline',
        class: cn(
          'bg-peelie-secondary-100 border-peelie-secondary-200 text-peelie-secondary-200',
          'disabled:opacity-32',
          'active:border-peelie-secondary-300 active:text-peelie-secondary-300',
        ),
      },
      // Secondary ghost
      {
        variant: 'secondary',
        buttonType: 'ghost',
        class: cn(
          'bg-transparent text-peelie-secondary-200',
          'disabled:opacity-32',
          'active:text-peelie-secondary-300',
        ),
      },
      // Error fill
      {
        variant: 'error',
        buttonType: 'fill',
        class: cn(
          'bg-peelie-error-200 text-peelie-white',
          'disabled:opacity-32',
          'active:bg-peelie-error-300',
        ),
      },
      // Error outline
      {
        variant: 'error',
        buttonType: 'outline',
        class: cn(
          'bg-peelie-error-100 border-peelie-error-200 text-peelie-error-200',
          'disabled:opacity-32',
          'active:border-peelie-error-300 active:text-peelie-error-300',
        ),
      },
      // Error ghost
      {
        variant: 'error',
        buttonType: 'ghost',
        class: cn(
          'bg-transparent text-peelie-error-200',
          'disabled:opacity-32',
          'active:text-peelie-error-300',
        ),
      },
    ],
  },
);

function Button({
  className,
  variant,
  buttonType,
  state,
  disabled,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      disabled={disabled || state === 'disabled'}
      className={cn(buttonVariants({ variant, buttonType, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
