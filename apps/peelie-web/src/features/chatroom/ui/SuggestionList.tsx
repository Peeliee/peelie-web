import { cn } from '@/shared/lib/utils';
import { formatChatTime } from '@/entities/chatroom';
import { PenIcon } from '@/shared/ui/icons/PenIcon';

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  createdAt?: string;
  disabled?: boolean;
  className?: string;
}

export function SuggestionList({
  suggestions,
  onSelect,
  createdAt,
  disabled,
  className,
}: SuggestionListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className={cn('flex flex-col items-end gap-2', className)}>
      <div className="flex flex-col items-end gap-1.5">
        {suggestions.map((text, i) => (
          <button
            key={i}
            type="button"
            onClick={() => !disabled && onSelect(text)}
            disabled={disabled}
            className="flex items-center gap-3"
          >
            <PenIcon className="size-5 text-gray-01" />
            <span
              className={cn(
                'max-w-[65vw] rounded-small rounded-tr-none bg-gray-10 px-3',
                'py-2 text-left text-body-m-400 text-text-main',
              )}
            >
              {text}
            </span>
          </button>
        ))}
      </div>
      {createdAt && (
        <time dateTime={createdAt} className="text-caption-m-400 text-gray-39">
          {formatChatTime(createdAt)}
        </time>
      )}
    </div>
  );
}
