import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Speech Bubble 컴포넌트
 *
 * Figma variant 매핑:
 * - arrow: 화살표 위치 (top_left, top_center, top_right, bottom_left, bottom_center, bottom_right)
 * - color: className으로 외부 제어 (Figma gray=bg-gray-30, main=bg-brand-30, sub=bg-brand-sub-30)
 * - title/content: children으로 자유 구성
 *
 * 화살표 색상은 부모의 배경색을 inherit하여 자동 일치.
 * 배경색은 반드시 className에 bg-* 로 지정해야 화살표 색상이 맞음.
 *
 * @see Figma node-id=4266-19122
 */

type ArrowPosition =
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'bottom_left'
  | 'bottom_center'
  | 'bottom_right';

interface BubbleProps {
  arrow?: ArrowPosition;
  className?: string;
  children: ReactNode;
}

const arrowPositionStyles: Record<ArrowPosition, string> = {
  top_left: 'top-0 left-2 -translate-y-full',
  top_center: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full',
  top_right: 'top-0 right-2 -translate-y-full',
  bottom_left: 'bottom-0 left-2 translate-y-full rotate-180',
  bottom_center: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full rotate-180',
  bottom_right: 'bottom-0 right-2 translate-y-full rotate-180',
};

export function Bubble({ arrow = 'top_right', className, children }: BubbleProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <div
        className={cn(
          'absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[9px] border-b-[inherit]',
          arrowPositionStyles[arrow],
        )}
        style={{ borderBottomColor: 'inherit' }}
      />
    </div>
  );
}
