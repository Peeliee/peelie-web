import { useState, type ComponentProps, type ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

import { PERSONALITY_LABEL, PersonalityType } from '@/shared/constants/personality';
import PATH from '@/shared/constants/path';
import { cn } from '@/shared/lib/utils';
import { ChevronRightIcon } from '@/shared/ui/icons/ChevronRightIcon';
import { SilentGoodIcon } from '@/shared/ui/icons/SilentGoodIcon';
import { StraightForwardIcon } from '@/shared/ui/icons/StraightForwardIcon';
import { FriendDetailModal } from '@/widgets/FriendDetailModal';

interface FriendDDayCardProps {
  chatRoomId: string;
  personality: PersonalityType;
  name: string;
  registeredAt: string;
  meetDate: string;
}

interface FriendAsset {
  png: string;
  FriendIcon: ComponentType<ComponentProps<'img'>>;
}

const FALLBACK_ASSET: FriendAsset = {
  png: '/friend-card/straight-forward-full.png',
  FriendIcon: StraightForwardIcon,
};

const FRIEND_ASSETS: Record<PersonalityType, FriendAsset> = {
  [PersonalityType.STRAIGHT_SHOOTER]: {
    png: '/friend-card/straight-forward-full.png',
    FriendIcon: StraightForwardIcon,
  },
  [PersonalityType.QUIET_CHARMER]: {
    png: '/friend-card/silent-good.png',
    FriendIcon: SilentGoodIcon,
  },
  [PersonalityType.ENERGETIC_TALKER]: FALLBACK_ASSET,
  [PersonalityType.ANALYTICAL_OBSERVER]: FALLBACK_ASSET,
  [PersonalityType.HEART_COLLECTOR]: FALLBACK_ASSET,
  [PersonalityType.STAGE_SETTER]: FALLBACK_ASSET,
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const parseLocalDate = (iso: string): Date => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
};

const todayLocal = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const computeDday = (meetIso: string): number => {
  const target = parseLocalDate(meetIso);
  return Math.round((target.getTime() - todayLocal().getTime()) / MS_PER_DAY);
};

const computeProgress = (registeredIso: string, meetIso: string): number => {
  const start = parseLocalDate(registeredIso).getTime();
  const end = parseLocalDate(meetIso).getTime();
  if (start >= end) return 100;
  const today = todayLocal().getTime();
  if (today <= start) return 0;
  if (today >= end) return 100;
  return ((today - start) / (end - start)) * 100;
};

export function FriendDDayCard({
  chatRoomId,
  personality,
  name,
  registeredAt,
  meetDate,
}: FriendDDayCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { png, FriendIcon } = FRIEND_ASSETS[personality];
  const label = PERSONALITY_LABEL[personality];
  const dday = computeDday(meetDate);
  const progress = computeProgress(registeredAt, meetDate);

  const ddayLabel = dday === 0 ? 'D-day' : `D-${dday}`;

  const goToChatRoom = () => navigate(`${PATH.CHAT_ROOM}/${chatRoomId}`);

  return (
    <>
      <div
        className={cn(
          'relative flex h-24 w-full flex-col',
          'justify-between rounded-medium border border-border-main',
          'bg-background-main px-4 py-3',
        )}
      >
        <div
          aria-hidden
          className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-medium')}
        >
          <img src={png} className={cn('absolute -top-2 right-3 size-25 select-none opacity-50')} />
        </div>

        <div className="flex items-center gap-3">
          <FriendIcon />

          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex h-5.25 items-center gap-1 text-body-s-400">
                <span className="text-brand-main">{label}</span>
                <span className="text-text-main">{name}</span>
              </div>
              <p className="text-caption-m-400">지금 바로 대화하러 가요!</p>
            </div>
            <ChevronRightIcon onClick={() => setIsModalOpen(true)} className="text-gray-50" />
          </div>
        </div>

        <div className="relative">
          <div
            className={cn(
              'absolute -top-8.5 z-10 flex -translate-x-1/2 items-center whitespace-nowrap',
              'rounded-full bg-gray-70 px-2 shadow-float',
            )}
            style={{ left: `${progress}%` }}
          >
            <span className="text-caption-m-400 text-gray-01">{ddayLabel}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-3">
            <div className="absolute inset-x-0 top-0.5 h-2 rounded-full bg-gray-30" />

            <div
              className="absolute left-0 top-0.5 h-2 rounded-full bg-brand-50"
              style={{ width: `${progress}%` }}
            />

            <div
              className={cn(
                'absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2',
                'rounded-full border-[1.2px] border-brand-50 bg-gray-01 shadow-float',
              )}
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <FriendDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChatClick={goToChatRoom}
        png={png}
        personalityLabel={label}
        name={name}
        ddayLabel={ddayLabel}
      />
    </>
  );
}
