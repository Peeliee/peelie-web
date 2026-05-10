import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/common/Input';
import { SearchIcon } from '@/shared/ui/icons/SearchIcon';

interface SearchBarProps extends Omit<ComponentProps<'input'>, 'type'> {}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-small border border-border-main bg-background-main px-3 py-2 transition-colors',
        'has-[:focus]:border-brand-50',
        className,
      )}
    >
      <SearchIcon className="size-6 shrink-0 text-text-main" />
      <Input
        type="text"
        className="w-full bg-transparent text-body-m-400 text-text-main outline-none placeholder:text-text-disable h-7"
        placeholder="찾고 싶은 대화를 검색해주세요."
        {...props}
      />
    </div>
  );
}
