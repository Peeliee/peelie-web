import { useState } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { Header } from '@/widgets/header/Header';
import { cn } from '@/shared/lib/utils';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { ShareIcon } from '@/shared/ui/icons/ShareIcon';
import { FriendCodeModal } from '@/widgets/FriendCodeModal';
import { ScheduleModal } from '@/widgets/ScheduleModal';

import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon';
import { UpcomingMeetCard } from './ui/UpcomingMeetCard';

export default function HomePage() {
  const [isFriendCodeOpen, setIsFriendCodeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <SsgoiTransition id="/">
      <Header>
        <button type="button" onClick={() => setIsFriendCodeOpen(true)} aria-label="공유">
          <ShareIcon className="size-6 text-gray-70" />
        </button>
      </Header>

      <section className='px-5'>
        <UpcomingMeetCard />

        <div className="mt-6 flex flex-col">
          <p className="text-caption-m-400 text-gray-50">스몰 토크를 위해 친구와</p>
          <div className="flex items-center justify-between">
            <p className="text-title-headline-1 text-text-main">대화 중인 목록</p>
            <button type="button" className="flex items-center gap-1">
              <span className="text-caption-m-400 text-gray-50">최신순</span>
              <ChevronDownIcon className="size-6 text-gray-50" />
            </button>
          </div>
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
      </section>
    </SsgoiTransition>
  );
}
