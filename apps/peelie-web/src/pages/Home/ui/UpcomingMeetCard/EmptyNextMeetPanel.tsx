import { cn } from '@/shared/lib/utils';

export function EmptyNextMeetPanel() {
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
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-caption-m-400 text-text-sub">가까운 시일 내 예정된 약속이 없어요</p>
          <p className="text-caption-m-400 text-text-sub">
            일정을 추가하고 친구와의 만남을 미리 준비해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
