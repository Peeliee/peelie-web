import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface ToggleSelectItem {
  value: string;
  label: ReactNode;
}

interface ToggleSelectProps {
  items: ToggleSelectItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ToggleSelect({ items, value, onChange, className }: ToggleSelectProps) {
  const selectedIndex = items.findIndex((item) => item.value === value);

  return (
    <div
      className={cn(
        'relative flex items-center gap-px rounded-full bg-brand-100 p-1 w-64',
        className,
      )}
    >
      {/* 슬라이딩 인디케이터 */}
      <div
        className={cn('absolute top-[4px] bottom-[4px] rounded-full bg-gray-01', 'shadow-tooltip transition-transform duration-300 ease-out')}
        style={{
          width: `calc((100% - 8px) / ${items.length})`,
          transform: `translateX(calc(${selectedIndex} * 100%))`,
        }}
      />

      {/* 탭 버튼 */}
      {items.map((item) => {
        const isSelected = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            className={cn(
              'relative z-10 flex flex-1 items-center justify-center rounded-full px-4 py-1 text-center text-body-2 transition-all duration-300',
              isSelected ? 'font-medium text-gray-99' : 'font-regular text-gray-59',
            )}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
