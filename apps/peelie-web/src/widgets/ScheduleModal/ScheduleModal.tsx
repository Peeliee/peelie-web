import { useEffect, useState } from 'react';
import Modal from '@/shared/ui/common/Modal/Modal';
import { XIcon } from '@/shared/ui/icons/XIcon';
import { MemoPanel } from './MemoPanel';
import { ScheduleInputPanel } from './ScheduleInputPanel';
import type { FriendSummary } from '@/entities/friendship/model/friendship.type';
import { useCreateScheduleMutation } from '@/entities/schedule';
import type { ScheduleDate } from '@/entities/schedule/model/schedule.type';

type Step = 'input' | 'memo';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: () => void;
}

export function ScheduleModal({ isOpen, onClose, onAddFriend }: ScheduleModalProps) {
  const [step, setStep] = useState<Step>('input');
  const [date, setDate] = useState<ScheduleDate>(getToday);
  const [friend, setFriend] = useState<FriendSummary | null>(null);
  const [memo, setMemo] = useState('');
  const createSchedule = useCreateScheduleMutation();

  // 모달 닫힘 애니메이션 종료 후 상태 초기화
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setStep('input');
      setDate(getToday());
      setFriend(null);
      setMemo('');
    }, 350);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = () => {
    if (!friend || createSchedule.isPending) return;

    createSchedule.mutate(
      {
        friendUserId: friend.id,
        meetDate: formatScheduleDate(date),
        description: memo.trim(),
      },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      closeOnEscape={false}
      className="bg-transparent p-0 w-80"
    >
      <div className="flex flex-col items-center gap-4">
        {step === 'input' && (
          <ScheduleInputPanel
            date={date}
            onDateChange={setDate}
            friend={friend}
            onFriendChange={setFriend}
            onAddFriend={onAddFriend}
            onNext={() => setStep('memo')}
          />
        )}
        {step === 'memo' && friend && (
          <MemoPanel
            friendName={friend.name}
            memo={memo}
            onMemoChange={setMemo}
            onSubmit={handleSubmit}
            isSubmitting={createSchedule.isPending}
          />
        )}
        <button type="button" onClick={onClose} aria-label="닫기">
          <XIcon />
        </button>
      </div>
    </Modal>
  );
}

function formatScheduleDate(date: ScheduleDate): string {
  return [date.year, date.month, date.day].map((value) => String(value).padStart(2, '0')).join('-');
}

function getToday(): ScheduleDate {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}
