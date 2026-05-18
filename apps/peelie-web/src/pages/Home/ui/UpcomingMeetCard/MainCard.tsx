import { cn } from '@/shared/lib/utils';
import { ChevronRightIcon } from '@/shared/ui/icons/ChevronRightIcon';
import { MiniCharacterMadIcon } from '@/shared/ui/icons/MiniCharacterMadIcon';

import type { Meet } from './types';
import { formatMeetDate } from './utils';

interface MainCardProps {
  meet: Meet;
  onChatClick?: () => void;
}

export function MainCard({ meet, onChatClick }: MainCardProps) {
  return (
    <div
      className={cn(
        'relative h-51 w-full overflow-hidden rounded-medium shadow-card-01',
        'bg-linear-to-b from-brand-main to-brand-30',
      )}
    >
      <div className={cn('pointer-events-none absolute right-0 top-9 h-42', 'w-51')}>
        <img
          src="/today-meet-character.png"
          className={cn(
            'absolute w-51 left-3/7 top-1/2 -translate-x-1/2',
            '-translate-y-1/2 select-none',
          )}
        />
      </div>

      <div className={cn('relative flex h-full flex-col px-5', 'py-5')}>
        <div className="flex items-center justify-between">
          <span className="text-title-headline-1 text-gray-79">오늘의 만남</span>
          <ChevronRightIcon className="size-6 text-gray-79" aria-hidden />
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <p className="text-body-s-400 font-medium text-gray-59">{formatMeetDate(meet.date)}</p>
          <div className="flex items-center gap-1.5">
            <MiniCharacterMadIcon />
            <p className="whitespace-nowrap text-body-s-400 font-medium text-gray-59">
              {meet.title}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChatClick}
          className={cn(
            'mt-auto flex h-12 items-center gap-1',
            'self-start rounded-full bg-gray-70 pl-4 pr-3',
          )}
        >
          <span className="text-body-m-500 text-gray-01">대화하기</span>
          <ChevronRightIcon className="size-6 text-gray-01" aria-hidden />
        </button>
      </div>
    </div>
  );
}
