import { useState } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { Header } from '@/widgets/header/Header';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { ShareIcon } from '@/shared/ui/icons/ShareIcon';
import { FriendCodeModal } from '@/widgets/FriendCodeModal';
import { ScheduleModal } from '@/widgets/ScheduleModal';

import { FriendDDayCard } from './ui/FriendDDayCard';
import { SearchBar } from './ui/SearchBar';
import { SortDropdown, type SortOrder } from './ui/SortDropdown';
import { UpcomingMeetCard } from './ui/UpcomingMeetCard';

export default function HomePage() {
  const [isFriendCodeOpen, setIsFriendCodeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('최신순');

  return (
    <SsgoiTransition id="/">
      <Header>
        <button type="button" onClick={() => setIsFriendCodeOpen(true)} aria-label="공유">
          <ShareIcon className="size-6 text-gray-70" />
        </button>
      </Header>

      <section className="px-5">
        <UpcomingMeetCard />

        <div className="mt-6 flex flex-col">
          <p className="text-caption-m-400">스몰 토크를 위해 친구와</p>
          <div className="flex items-center justify-between">
            <p className="text-title-headline-1 text-text-main">대화 중인 목록</p>
            <SortDropdown value={sortOrder} onChange={setSortOrder} />
          </div>
        </div>

        <SearchBar className="mt-3" />

        <div className="mt-3 flex flex-col gap-3">
          <FriendDDayCard
            type="직진 본능파"
            name="유지원"
            registeredAt="2026-04-21"
            meetDate="2026-05-14"
          />
          <FriendDDayCard
            type="조용한 호감캐"
            name="김나은"
            registeredAt="2026-04-25"
            meetDate="2026-05-22"
          />{' '}
          <FriendDDayCard
            type="조용한 호감캐"
            name="김나은"
            registeredAt="2026-04-25"
            meetDate="2026-05-22"
          />{' '}
          <FriendDDayCard
            type="조용한 호감캐"
            name="김나은"
            registeredAt="2026-04-25"
            meetDate="2026-05-22"
          />{' '}
          <FriendDDayCard
            type="조용한 호감캐"
            name="김나은"
            registeredAt="2026-04-25"
            meetDate="2026-05-22"
          />{' '}
          <FriendDDayCard
            type="조용한 호감캐"
            name="김나은"
            registeredAt="2026-04-25"
            meetDate="2026-05-22"
          />
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

        <FriendCodeModal isOpen={isFriendCodeOpen} onClose={() => setIsFriendCodeOpen(false)} />

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
