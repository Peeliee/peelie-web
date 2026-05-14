import { cn } from '@/shared/lib/utils';
import { formatChatTime } from '@/entities/chatroom';

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
          <div key={i} className="flex items-center gap-3">
            <EditIcon className="size-5 text-gray-01" />
            <button
              type="button"
              onClick={() => !disabled && onSelect(text)}
              disabled={disabled}
              className={cn(
                'min-w-[98px] rounded-small rounded-tr-none bg-gray-10 px-3 py-2',
                'text-right text-body-m-400 text-text-main',
              )}
            >
              {text}
            </button>
          </div>
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
