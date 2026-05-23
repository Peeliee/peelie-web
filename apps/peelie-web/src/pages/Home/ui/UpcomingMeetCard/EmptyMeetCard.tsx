import { cn } from '@/shared/lib/utils';
import { MiniCharacterMadIcon } from '@/shared/ui/icons/MiniCharacterMadIcon';

export function EmptyMeetCard() {
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
          <span className="text-title-headline-1 text-gray-79">다가오는 만남</span>
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <p className="text-body-s-400 font-medium text-gray-59">아직 약속이 없어요</p>
          <div className="flex items-center gap-1.5">
            <MiniCharacterMadIcon />
            <p className="whitespace-nowrap text-body-s-400 font-medium text-gray-59">
              친구와 만남을 만들어보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
