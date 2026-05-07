import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PATH from '@/shared/constants/path';
import { MainCard } from './MainCard';
import { MeetList } from './MeetList';
import { NextMeetPanel } from './NextMeetPanel';
import type { Meet } from './types';

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

const today = new Date();

const MOCK_MEETS: Meet[] = [
  {
    id: '1',
    date: toIso(addDays(today, 1)),
    title: '지원님과의 약속',
    friend: { id: 'f1', name: '김지원', type: '친구 유형' },
  },
  {
    id: '2',
    date: toIso(addDays(today, 2)),
    title: '나은님과의 오랜만의 만남',
    friend: { id: 'f2', name: '김나은', type: '친구 유형' },
  },
  {
    id: '3',
    date: toIso(addDays(today, 3)),
    title: '나은님과의 첫 대면만남',
    friend: { id: 'f2', name: '김나은', type: '친구 유형' },
  },
  {
    id: '4',
    date: toIso(addDays(today, 4)),
    title: '나은님과의 오랜만의 만남',
    friend: { id: 'f2', name: '김나은', type: '친구 유형' },
  },
  {
    id: '5',
    date: toIso(addDays(today, 5)),
    title: '나은님과의 오랜만의 만남',
    friend: { id: 'f2', name: '김나은', type: '친구 유형' },
  },
  {
    id: '6',
    date: toIso(addDays(today, 6)),
    title: '나은님과의 오랜만의 만남',
    friend: { id: 'f2', name: '김나은', type: '친구 유형' },
  },
];

export function UpcomingMeetCard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const meets = MOCK_MEETS;
  if (meets.length === 0) return null;

  const main = meets[0];
  const next = meets[1];
  const restMeets = meets.slice(1);
  const showPanel = meets.length >= 2;
  const showToggle = meets.length >= 3;

  const goToChatRoom = () => navigate(PATH.CHAT_ROOM);
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="isolate flex w-full flex-col">
      <div className="z-[2] flex w-full flex-col">

        <MainCard meet={main} onChatClick={goToChatRoom} />

        {showPanel && (
          <NextMeetPanel
            meet={next}
            showToggle={showToggle}
            isOpen={isOpen}
            onToggle={handleToggle}
          />
        )}
      </div>

      {showToggle && (
        <div className="z-[1] -mt-3">
          <MeetList meets={restMeets} isOpen={isOpen} onItemClick={goToChatRoom} />
        </div>
      )}
    </div>
  );
}
