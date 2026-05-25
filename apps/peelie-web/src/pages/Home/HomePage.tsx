import { useEffect, useState } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { useOutletContext } from 'react-router-dom';

import { useGetChatRoomsQuery } from '@/entities/chatroom';
import type { ChatRoomSort } from '@/entities/chatroom/model/chatRoom.type';
import { DDayModal, useGetTodayDDayQuery } from '@/entities/schedule';
import { PERSONALITY_LABEL } from '@/shared/constants/personality';
import Modal from '@/shared/ui/common/Modal/Modal';
import { ShareIcon } from '@/shared/ui/icons/ShareIcon';
import { Header } from '@/widgets/header/Header';
import { isInWebView } from '@/shared/lib/isInWebView';
import { cn } from '@/shared/lib/utils';

import { FriendDDayCard } from './ui/FriendDDayCard';
import { SearchBar } from './ui/SearchBar';
import { SortDropdown, type SortOrder } from './ui/SortDropdown';
import { UpcomingMeetCard } from './ui/UpcomingMeetCard';

interface HomeOutletContext {
  openFriendCodeModal: () => void;
}

const SORT_TO_API: Record<SortOrder, ChatRoomSort> = {
  최신순: 'recent',
  '오래된 순': 'stale',
};

export default function HomePage() {
  const inWebView = isInWebView();

  const { openFriendCodeModal } = useOutletContext<HomeOutletContext>();
  const [sortOrder, setSortOrder] = useState<SortOrder>('최신순');
  const [isDDayOpen, setIsDDayOpen] = useState(false);

  const { data } = useGetChatRoomsQuery({ sort: SORT_TO_API[sortOrder] });
  const chatRooms = data?.data ?? [];

  const { data: todayDDayItems } = useGetTodayDDayQuery();
  const items = (todayDDayItems ?? []).filter((item) => item.summary);
  const [queueIndex, setQueueIndex] = useState(0);
  const currentDday = items[queueIndex];

  useEffect(() => {
    if (items.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const key = `dday-shown-${today}`;
    if (localStorage.getItem(key)) return;
    setIsDDayOpen(true);
    localStorage.setItem(key, '1');
  }, [items.length]);

  const handleDDayClose = () => {
    setIsDDayOpen(false);
    if (queueIndex + 1 < items.length) {
      setTimeout(() => {
        setQueueIndex((i) => i + 1);
        setIsDDayOpen(true);
      }, 350);
    }
  };

  return (
    <SsgoiTransition id="/">
      <div className={cn(inWebView && 'pt-10')} />
      <Header>
        <button type="button" onClick={openFriendCodeModal} aria-label="공유">
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
          {chatRooms.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pt-15">
              <p className="text-caption-m-400 text-text-sub">
                가까운 시일 내 예정된 약속이 없어요
              </p>
              <p className="text-caption-m-400 text-text-sub">
                일정을 추가하고 친구와의 만남을 미리 준비해보세요
              </p>
            </div>
          ) : (
            chatRooms.map((room) => (
              <FriendDDayCard
                key={room.chatRoomId}
                chatRoomId={room.chatRoomId}
                personality={room.friend.personality}
                name={room.friend.name}
                registeredAt={room.registeredAt}
                meetDate={room.meetDate}
              />
            ))
          )}
        </div>
      </section>

      {currentDday?.summary && (
        <Modal
          key={queueIndex}
          isOpen={isDDayOpen}
          onClose={handleDDayClose}
          className="w-auto bg-transparent p-0"
        >
          <DDayModal
            friendName={currentDday.friend.name}
            friendPersonality={PERSONALITY_LABEL[currentDday.friend.personality]}
            summaryDescription={currentDday.summary}
            onHome={handleDDayClose}
            onSaveImage={() => console.log('save image')}
          />
        </Modal>
      )}
    </SsgoiTransition>
  );
}
