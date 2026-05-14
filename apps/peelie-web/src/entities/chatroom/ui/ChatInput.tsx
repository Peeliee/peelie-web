import type { ChangeEvent } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/common/Input';
import { ChevronUpIcon } from '@/shared/ui/icons/ChevronUpIcon';

interface ChatInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onRecommend?: () => void;
  /** 스트리밍 중 등 입력/전송 차단. */
  disabled?: boolean;
  className?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onRecommend,
  disabled,
  className,
}: ChatInputProps) {
  const handleSubmit = () => {
    if (disabled) return;
    onSubmit();
  };

  return (
    <div className={cn('fixed bottom-0 left-0 right-0 px-5 py-2', className)}>
      <div className="rounded-[12px] border border-border-main bg-background-main px-4 py-3  bg-bg-main">
        <div className="flex flex-col gap-2">
          <Input
            value={value}
            onChange={onChange}
            placeholder="직접 입력해보세요"
            disabled={disabled}
            className="w-full bg-transparent text-body-s-400 text-text-main outline-none placeholder:text-text-disabled disabled:opacity-60"
          />
          <div className="h-px w-full rounded-full bg-alpha-10" />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onRecommend}
              disabled={disabled}
              className="flex h-8 items-center gap-1 rounded-full px-2 disabled:opacity-60"
            >
              <LoaderIcon className="size-4 text-text-main" />
              <span className="text-caption-m-400 text-text-main">추천 답변</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={disabled}
              className="flex items-center justify-center rounded-full border border-border-main px-2 py-1 disabled:opacity-60"
            >
              <ChevronUpIcon className="size-[22px] text-text-main" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
