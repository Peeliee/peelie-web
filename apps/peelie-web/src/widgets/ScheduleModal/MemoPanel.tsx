import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/common/button';
import { Input } from '@/shared/ui/common/Input';
import { ModalCharacterIcon } from '@/shared/ui/icons/ModalCharacterIcon';

const MEMO_MAX_LENGTH = 50;

interface MemoPanelProps {
  friendName: string;
  memo: string;
  onMemoChange: (next: string) => void;
  onSubmit: () => void;
}

export function MemoPanel({ friendName, memo, onMemoChange, onSubmit }: MemoPanelProps) {
  const canSubmit = memo.trim().length > 0;

  return (
    <div className="flex h-[400px] w-full flex-col items-center rounded-large bg-gray-01 pt-7 pb-7">
      {/* 헤더 */}
      <div className="flex flex-col items-center gap-3">
        <ModalCharacterIcon />
        <div className="flex flex-col items-center gap-1 whitespace-nowrap text-center">
          <p className="text-body-l-500 text-text-main">이번 만남은 어떤 자리인가요?</p>
          <p className="text-caption-m-400 text-text-sub">{friendName}님과의 대화에</p>
        </div>
      </div>

      {/* 메모 입력 */}
      <div className="mt-5 flex w-[272px] flex-col items-end gap-1">
        <div
          className={cn(
            'flex h-32 w-full rounded-small border px-3 py-2',
            'border-border-main has-[[data-focused]]:border-brand-50',
          )}
        >
          <Input
            multiline
            value={memo}
            maxLength={MEMO_MAX_LENGTH}
            onChange={(e) => onMemoChange((e.target as HTMLTextAreaElement).value)}
            placeholder="작성해주세요."
            className={cn('size-full resize-none bg-transparent text-body-s-400 text-text-main', 'outline-none placeholder:text-text-disabled')}
          />
        </div>
        <span className="text-caption-m-400 text-text-disabled">
          {memo.length}/{MEMO_MAX_LENGTH}
        </span>
      </div>

      {/* 일정 추가하기 버튼 */}
      <Button
        color="tertiary"
        radius="full"
        size="md"
        disabled={!canSubmit}
        onClick={onSubmit}
        className="mt-auto w-[264px] bg-gray-70 text-body-m-400 text-gray-01 disabled:bg-gray-50"
      >
        일정 추가하기
      </Button>
    </div>
  );
}
