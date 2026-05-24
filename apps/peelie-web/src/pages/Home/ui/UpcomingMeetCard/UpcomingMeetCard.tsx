import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetSchedulesQuery } from '@/entities/schedule';
import PATH from '@/shared/constants/path';

import { EmptyMeetCard } from './EmptyMeetCard';
import { EmptyNextMeetPanel } from './EmptyNextMeetPanel';
import { MainCard } from './MainCard';
import { MeetList } from './MeetList';
import { NextMeetPanel } from './NextMeetPanel';
import { toMeet } from './utils';

export function UpcomingMeetCard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { data: schedules } = useGetSchedulesQuery({
    filter: 'upcoming',
    order: 'asc',
  });

  const meets = schedules?.map(toMeet) ?? [];
  const main = meets[0];
  const next = meets[1];
  const restMeets = meets.slice(1);
  const hasMain = meets.length >= 1;
  const hasNext = meets.length >= 2;
  const showToggle = meets.length >= 3;

  const goToChatRoom = () => {
    if (!main) return;
    navigate(`${PATH.CHAT_ROOM}/${main.chatRoomId}`);
  };
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative isolate z-10 flex w-full flex-col">
      <div className="z-2 flex w-full flex-col">
        {hasMain ? <MainCard meet={main} onChatClick={goToChatRoom} /> : <EmptyMeetCard />}

        {hasNext ? (
          <NextMeetPanel
            meet={next}
            showToggle={showToggle}
            isOpen={isOpen}
            onToggle={handleToggle}
          />
        ) : (
          <EmptyNextMeetPanel />
        )}
      </div>

      {showToggle && (
        <div className="absolute inset-x-0 top-full z-1 -mt-3">
          <MeetList meets={restMeets} isOpen={isOpen} onItemClick={goToChatRoom} />
        </div>
      )}
    </div>
  );
}
