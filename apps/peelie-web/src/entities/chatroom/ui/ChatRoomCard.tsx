import { ChatItemIcon } from '@/shared/ui/icons/ChatItemIcon';
import { cn } from '@/shared/lib/utils';

import type { PersonalityType } from '../model';

/**
 * personality → 한글 뱃지 라벨.
 * TODO: 디자인 확정 후 정확한 라벨로 교체.
 */
const PERSONALITY_BADGE: Record<PersonalityType, string> = {
  STRAIGHT_SHOOTER: '직진 본능파',
  ENERGETIC_TALKER: '불꽃 토커',
  QUIET_CHARMER: '조용한 매력파',
  ANALYTICAL_OBSERVER: '분석적 관찰자',
  HEART_COLLECTOR: '하트 수집가',
  STAGE_SETTER: '분위기 메이커',
};

interface ChatRoomCardProps {
  userName: string;
  personality: PersonalityType;
  /** null 이면 미리보기 비움 (메시지 없음). */
  lastMessage: string | null;
  lastMessageAt: string;
  isUnread?: boolean;
  onClick?: () => void;
}

export function ChatRoomCard({
  userName,
  personality,
  lastMessage,
  lastMessageAt,
  isUnread,
  onClick,
}: ChatRoomCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl px-3 py-4 text-left active:bg-gray-30"
    >
      <div className="flex items-center gap-4 transition-transform duration-150 group-active:scale-[0.97]">
      {/* 아바타 */}
      <div className="relative size-[46px] shrink-0 overflow-hidden rounded-full bg-gray-79">
        <ChatItemIcon className="absolute left-1/2 top-[9px] h-[46px] w-[33px] -translate-x-1/2" />
      </div>

      {/* 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* 뱃지 + 이름 + 안 읽음 도트 */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'rounded-xsmall bg-brand-main px-[6px] py-[2px]',
              'text-caption-m-400 text-gray-70',
            )}
          >
            {PERSONALITY_BADGE[personality]}
          </span>
          <span className="text-body-s-400 font-medium text-gray-99">{userName}</span>
          {isUnread && (
            <span
              aria-label="안 읽은 메시지 있음"
              className="size-1.5 shrink-0 rounded-full bg-brand-sub-30"
            />
          )}
        </div>

        {/* 미리보기 + 시간 */}
        <div className="flex items-center justify-between gap-3 whitespace-nowrap">
          <p className="truncate text-caption-m-400 text-gray-99">{lastMessage ?? ''}</p>
          <span className="shrink-0 text-caption-m-400 text-text-disabled">
            {formatRelativeTime(lastMessageAt)}
          </span>
        </div>
      </div>
      </div>
    </button>
  );
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60_000);
  if (min < 1) return '방금 전';
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  return `${Math.floor(hr / 24)}일 전`;
}
