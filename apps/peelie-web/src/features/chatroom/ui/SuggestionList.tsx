import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { formatChatTime } from '@/entities/chatroom';

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  createdAt?: string;
  disabled?: boolean;
  className?: string;
}

const SELECT_DELAY_MS = 400;

export function SuggestionList({
  suggestions,
  onSelect,
  createdAt,
  disabled,
  className,
}: SuggestionListProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = (text: string, i: number) => {
    if (disabled) return;
    if (selectedIndex !== null) return;
    setSelectedIndex(i);
    timerRef.current = window.setTimeout(() => {
      onSelect(text);
    }, SELECT_DELAY_MS);
  };

  if (suggestions.length === 0) return null;

  return (
    <div className={cn('flex flex-col items-end gap-2', className)}>
      <div className="flex flex-col items-end gap-1.5">
        {suggestions.map((text, i) => {
          const isSelected = selectedIndex === i;
          const isFaded = selectedIndex !== null && !isSelected;
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 transition-all duration-300 ease-out',
                isFaded && 'translate-y-1 opacity-0',
              )}
            >
              <EditIcon className="size-5 text-gray-01" />
              <button
                type="button"
                onClick={() => handleClick(text, i)}
                disabled={disabled || selectedIndex !== null}
                className={cn(
                  'min-w-[98px] rounded-small rounded-tr-none px-3 py-2',
                  'text-right text-body-m-400 text-text-main',
                  'transition-all duration-300 ease-out',
                  isSelected ? 'scale-105 bg-brand-30' : 'bg-gray-10',
                )}
              >
                {text}
              </button>
            </div>
          );
        })}
      </div>
      {createdAt && (
        <time dateTime={createdAt} className="text-caption-m-400 text-gray-39">
          {formatChatTime(createdAt)}
        </time>
      )}
    </div>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M14.166 2.5a1.768 1.768 0 0 1 2.5 2.5L6.25 15.417 2.5 16.667l1.25-3.75L14.166 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
