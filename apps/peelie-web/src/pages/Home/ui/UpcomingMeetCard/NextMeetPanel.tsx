import { cn } from '@/shared/lib/utils';
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon';
import type { Meet } from './types';
import { formatMeetDate, getDday } from './utils';
import { MiniCharacterMadIcon } from '@/shared/ui/icons/MiniCharacterMadIcon';

interface NextMeetPanelProps {
  meet: Meet;
  showToggle: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export function NextMeetPanel({ meet, showToggle, isOpen, onToggle }: NextMeetPanelProps) {
  return (
    <div className={cn('relative isolate flex w-full flex-col', 'items-center')}>
      <div className={cn('z-2 -mt-1 flex w-[305px] items-center', 'justify-between')}>
        <div className="h-3.5 w-1 rounded-full bg-gray-50" />
        <div className="h-3.5 w-1 rounded-full bg-gray-50" />
      </div>

      <div
        className={cn(
          'z-1 -mt-1.5 h-[60px] w-full overflow-hidden',
          'rounded-medium border border-border-main bg-brand-30',
        )}
      >
        <div className={cn('flex h-full items-center justify-between px-4', 'py-2.5')}>
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-brand-50 px-3 py-1">
              <span className="text-body-m-400 font-medium text-gray-79">{getDday(meet.date)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-caption-m-400 leading-3">{formatMeetDate(meet.date)}</p>
              <div className="flex items-center gap-1">
                <MiniCharacterMadIcon />
                <p className="whitespace-nowrap text-body-s-400 font-medium text-text-main">
                  {meet.title}
                </p>
              </div>
            </div>
          </div>

          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-label={isOpen ? '다가오는 만남 닫기' : '다가오는 만남 더보기'}
              aria-expanded={isOpen}
              className="shrink-0"
            >
              <ChevronDownIcon
                className={cn('size-6 text-text-main transition-transform', isOpen && 'rotate-180')}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
