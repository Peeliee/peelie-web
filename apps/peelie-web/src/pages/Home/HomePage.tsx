import { useState } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { Header } from '@/widgets/header/Header';
import { cn } from '@/shared/lib/utils';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { FriendCodeModal } from '@/widgets/FriendCodeModal';
import { ScheduleModal } from '@/widgets/ScheduleModal';

export default function HomePage() {
  const [isFriendCodeOpen, setIsFriendCodeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <SsgoiTransition id="/">
      <Header onShareClick={() => setIsFriendCodeOpen(true)} />

      <div className={cn('flex flex-col items-center justify-center', 'min-h-screen gap-6 ')}>
        <h1 className="heading-1-medium text-gray-99">Home</h1>
      </div>

      <Button
        size={'lg'}
        radius={'full'}
        iconLeft={<PlusIcon />}
        onClick={() => setIsScheduleOpen(true)}
        className="fixed bottom-[60px] left-1/2 -translate-x-1/2 px-4"
      >
        일정 추가하기
      </Button>

      <FriendCodeModal
        isOpen={isFriendCodeOpen}
        onClose={() => setIsFriendCodeOpen(false)}
        myCode="n7f0yure"
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onAddFriend={() => {
          setIsScheduleOpen(false);
          setIsFriendCodeOpen(true);
        }}
      />
    </SsgoiTransition>
  );
}
