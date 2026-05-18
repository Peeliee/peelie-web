import type { ComponentProps, ComponentType } from 'react';
import { ChevronRightIcon } from '@/shared/ui/icons/ChevronRightIcon';
import { SilentGoodIcon } from '@/shared/ui/icons/SilentGoodIcon';
import { StraightForwardIcon } from '@/shared/ui/icons/StraightForwardIcon';
import { cn } from '@/shared/lib/utils';

export type FriendType = '조용한 호감캐' | '직진 본능파';

interface FriendDDayCardProps {
  type: FriendType;
  name: string;
  registeredAt: string;
  meetDate: string;
}

const FRIEND_ASSETS: Record<
  FriendType,
  { png: string; FriendIcon: ComponentType<ComponentProps<'img'>> }
> = {
  '조용한 호감캐': { png: '/friend-card/silent-good.png', FriendIcon: SilentGoodIcon },
  '직진 본능파': { png: '/friend-card/straight-forward.png', FriendIcon: StraightForwardIcon },
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const parseLocalDate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const todayLocal = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const computeDday = (meetIso: string): number => {
  const target = parseLocalDate(meetIso);
  return Math.round((target.getTime() - todayLocal().getTime()) / MS_PER_DAY);
};

const computeProgress = (registeredIso: string, meetIso: string): number => {
  const start = parseLocalDate(registeredIso).getTime();
  const end = parseLocalDate(meetIso).getTime();
  if (start >= end) return 100;
  const today = todayLocal().getTime();
  if (today <= start) return 0;
  if (today >= end) return 100;
  return ((today - start) / (end - start)) * 100;
};

export function FriendDDayCard({ type, name, registeredAt, meetDate }: FriendDDayCardProps) {
  const { png, FriendIcon } = FRIEND_ASSETS[type];
  const dday = computeDday(meetDate);
  const progress = computeProgress(registeredAt, meetDate);
  const ddayLabel = dday === 0 ? 'D-day' : `D-${dday}`;

  return (
    <div
      className={cn(
        'relative flex h-24 w-full flex-col',
        'justify-between overflow-hidden rounded-medium border border-border-main',
        'bg-background-main px-4 py-3',
      )}
    >
      <img
        src={png}
        aria-hidden
        className={cn(
          'pointer-events-none absolute -top-2 right-3 size-25',
          'select-none opacity-50',
        )}
      />

      <div className="flex items-center gap-3">
        <FriendIcon />

        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex h-5.25 items-center gap-1 text-body-s-400">
              <span className="text-brand-main">{type}</span>
              <span className="text-text-main">{name}</span>
            </div>
            <p className="text-caption-m-400">지금 바로 대화하러 가요!</p>
          </div>

          <ChevronRightIcon className="text-gray-50" />
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            'absolute -top-8.5 flex -translate-x-1/2 items-center',
            'rounded-full bg-gray-70 px-2 shadow-float',
          )}
          style={{ left: `${progress}%`, marginLeft: '-4px' }}
        >
          <span className="text-caption-m-400 text-gray-01">{ddayLabel}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-3">
          <div className={cn('absolute inset-x-0 top-[2px] h-2 rounded-full', 'bg-gray-30')} />
          <div
            className="absolute inset-y-0 left-0 flex items-center"
            style={{ width: `${progress}%` }}
          >
            <div className="-mr-1.5 h-2 flex-1 rounded-full bg-brand-50" />
            <div
              className={cn(
                'size-3 shrink-0 rounded-full border-[1.2px] border-brand-50',
                'bg-gray-01 shadow-float',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
