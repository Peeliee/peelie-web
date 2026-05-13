import { cn } from '@/shared/lib/utils';

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  className?: string;
}

export function SuggestionList({ suggestions, onSelect, className }: SuggestionListProps) {
  if (suggestions.length === 0) return null;
  return (
    <div className={cn('mt-1 flex flex-wrap gap-2 pl-8', className)}>
      {suggestions.map((text, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(text)}
          className={cn(
            'rounded-full border border-brand-sub-30 bg-white px-3 py-1.5',
            'text-body-s-400 text-brand-sub-30',
            'transition-colors hover:bg-brand-sub-30/10 active:bg-brand-sub-30/20',
          )}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
