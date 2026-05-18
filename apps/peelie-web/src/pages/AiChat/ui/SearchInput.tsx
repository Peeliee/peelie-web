import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';
import { SearchIcon } from '@/shared/ui/icons/SearchIcon';

interface SearchInputProps extends Omit<ComponentProps<'input'>, 'type'> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-small border border-border-main px-3 py-2 transition-colors',
        'has-[:focus]:border-brand-50',
        className,
      )}
    >
      <SearchIcon className="size-6 shrink-0 text-text-main" />
      <input
        type="text"
        className={cn(
          'w-full bg-transparent text-body-m-400 text-text-main outline-none',
          'placeholder:text-text-disabled',
        )}
        placeholder="찾고 싶은 대화를 검색해주세요."
        {...props}
      />
    </div>
  );
}
