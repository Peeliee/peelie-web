import { useEffect, useState } from 'react';
import Modal from '@/shared/ui/common/Modal/Modal';
import { XIcon } from '@/shared/ui/icons/XIcon';
import { MemoPanel } from './MemoPanel';
import { ScheduleInputPanel } from './ScheduleInputPanel';
import type { Friend, ScheduleDate } from './types';

type Step = 'input' | 'memo';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: () => void;
}

export function ScheduleModal({ isOpen, onClose, onAddFriend }: ScheduleModalProps) {
  const [step, setStep] = useState<Step>('input');
  const [date, setDate] = useState<ScheduleDate>(getToday);
  const [friend, setFriend] = useState<Friend | null>(null);
  const [memo, setMemo] = useState('');

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
    // TODO: 일정 추가 API 호출 (date, friend, memo)
    onClose();
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
          />
        )}
        <button type="button" onClick={onClose} aria-label="닫기">
          <XIcon />
        </button>
      </div>
    </Modal>
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
