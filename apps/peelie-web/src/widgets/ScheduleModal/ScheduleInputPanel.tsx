import { ModalCharacterIcon } from '@/shared/ui/icons/ModalCharacterIcon';
import { Button } from '@/shared/ui/common/button';
import { useGetFriendshipsQuery } from '@/entities/friendship';
import type { FriendSummary } from '@/entities/friendship/model/friendship.type';
import type { ScheduleDate } from '@/entities/schedule/model/schedule.type';
import { DatePicker } from './DatePicker';
import { FriendSelect } from './FriendSelect';
import { cn } from '@/shared/lib/utils';

const YEAR_MAX = 2050;

interface ScheduleInputPanelProps {
  date: ScheduleDate;
  onDateChange: (next: ScheduleDate) => void;
  friend: FriendSummary | null;
  onFriendChange: (friend: FriendSummary) => void;
  onAddFriend: () => void;
  onNext: () => void;
}

export function ScheduleInputPanel({
  date,
  onDateChange,
  friend,
  onFriendChange,
  onAddFriend,
  onNext,
}: ScheduleInputPanelProps) {
  const { data: friendships = [] } = useGetFriendshipsQuery();
  const today = getToday();

  const yearMin = today.year;
  const monthMin = date.year === today.year ? today.month : 1;
  const dayMin = date.year === today.year && date.month === today.month ? today.day : 1;
  const dayMax = lastDayOfMonth(date.year, date.month);

  const handleYearChange = (year: number) => {
    if (year === today.year) {
      onDateChange({ year, month: today.month, day: today.day });
    } else {
      onDateChange({ year, month: 1, day: 1 });
    }
  };

  const handleMonthChange = (month: number) => {
    const isToday = date.year === today.year && month === today.month;
    onDateChange({ year: date.year, month, day: isToday ? today.day : 1 });
  };

  const handleDayChange = (day: number) => {
    onDateChange({ ...date, day });
  };

  const canProceed = friend !== null;
  const hasFriends = friendships.length > 0;

  return (
    <div
      className={cn(
        'flex h-[464px] w-full flex-col',
        'items-center rounded-large',
        'bg-gray-01 pt-7 pb-7',
      )}
    >
      {/* 헤더 */}
      <div className="flex flex-col items-center gap-3">
        <ModalCharacterIcon />
        <div className="whitespace-nowrap text-center text-body-l-500 text-text-main">
          <p>친구와의 약속 일정이 잡혔다면,</p>
          <p>일정을 추가해봐요.</p>
        </div>
      </div>

      {/* 일자 + 친구 입력 */}
      <div className="mt-[11px] flex w-[262px] flex-col gap-3">
        {/* 일자 입력 */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-body-s-400 font-medium text-text-main">일자 입력</span>
          <div className="flex items-center justify-between gap-5">
            <DatePicker
              value={date.year}
              onChange={handleYearChange}
              min={yearMin}
              max={YEAR_MAX}
              suffix="년"
              className="px-1"
            />
            <DatePicker
              value={date.month}
              onChange={handleMonthChange}
              min={monthMin}
              max={12}
              suffix="월"
              pad
            />
            <DatePicker
              value={date.day}
              onChange={handleDayChange}
              min={dayMin}
              max={dayMax}
              suffix="일"
              pad
            />
          </div>
        </div>

        {/* 친구 입력 */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-body-s-400 font-medium text-text-main">친구 입력</span>
          <FriendSelect friends={friendships} selected={friend} onSelect={onFriendChange} />
          <button
            type="button"
            onClick={onAddFriend}
            className="self-center text-caption-m-400 text-text-disabled underline"
          >
            {hasFriends ? '친구 추가하기' : '친구를 먼저 추가하러 가볼까요?'}
          </button>
        </div>
      </div>

      {/* 다음으로 버튼 */}
      <Button
        color="tertiary"
        radius="full"
        size="md"
        disabled={!canProceed}
        onClick={onNext}
        className={cn(
          'mt-auto w-[264px] bg-gray-70',
          'text-body-m-400 text-gray-01 disabled:bg-gray-50',
        )}
      >
        다음으로
      </Button>
    </div>
  );
}

function getToday(): ScheduleDate {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

function lastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
