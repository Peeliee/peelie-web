import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

/**
 * btn/primary 컴포넌트
 *
 * Figma variant 매핑:
 * - size: height 속성에 대응 (xs=h24, sm=h32, md=h48, lg=h56)
 * - radius: radius 속성에 대응 (none=r0, sm=r8, md=r16, full=r100)
 * - variant: style 속성에 대응 (default=filled, line=outlined)
 * - status: default/pressed는 CSS :active로 처리, disabled는 native disabled
 * - icon-left/icon-right: iconLeft, iconRight prop (동일 동작)
 * - 텍스트 스타일: 외부에서 className으로 제어
 *
 * @see Figma node-id=4233-19570
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer disabled:cursor-not-allowed shrink-0',
  {
    variants: {
      /** @default 'default' — Figma style (default=filled, line=outlined) */
      variant: {
        default: [
          'bg-brand-main text-gray-99',
          'active:bg-brand-main-pressed',
          'disabled:bg-gray-30 disabled:text-text-disabled',
        ],
        line: [
          'bg-transparent border border-brand-main text-gray-99',
          'active:border-brand-main-pressed',
          'disabled:border-gray-39 disabled:text-text-disabled disabled:bg-transparent',
        ],
      },
      /** @default 'md' — Figma height (xs=h24, sm=h32, md=h48, lg=h56) */
      size: {
        xs: 'h-6 px-2',
        sm: 'h-8 px-3',
        md: 'h-12 px-4',
        lg: 'h-14 px-6',
      },
      /** @default 'sm' — Figma radius (none=r0, sm=r8, md=r16, full=r100) */
      radius: {
        none: 'rounded-none',
        sm: 'rounded-s',
        md: 'rounded-m',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      radius: 'sm',
    },
  },
);

function Button({
  className,
  variant,
  size,
  radius,
  iconLeft,
  iconRight,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Figma icon-left=on 일 때 렌더링 */
    iconLeft?: React.ReactNode;
    /** Figma icon-right=on 일 때 렌더링 (icon-left와 동일 동작) */
    iconRight?: React.ReactNode;
  }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, radius }), className)}
      {...props}
    >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}

export { Button, buttonVariants };
