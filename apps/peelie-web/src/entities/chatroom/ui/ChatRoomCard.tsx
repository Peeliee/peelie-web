import { ChatItemIcon } from '@/shared/ui/icons/ChatItemIcon';
import { cn } from '@/shared/lib/utils';

import { PERSONALITY_LABEL } from '../model';
import type { PersonalityType } from '../model';

interface ChatRoomCardProps {
  userName: string;
  personality: PersonalityType;
  isWithdrawn?: boolean;
  /** null 이면 미리보기 비움 (메시지 없음). */
  lastMessage: string | null;
  lastMessageAt: string;
  isUnread?: boolean;
  onClick?: () => void;
}

export function ChatRoomCard({
  userName,
  personality,
  isWithdrawn,
  lastMessage,
  lastMessageAt,
  isUnread,
  onClick,
}: ChatRoomCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('group w-full rounded-2xl px-3 py-4', 'text-left active:bg-gray-30')}
    >
      <div
        className={cn(
          'flex items-center gap-4 transition-transform duration-150',
          'group-active:scale-[0.97]',
        )}
      >
        {/* 아바타 */}
        <div
          className={cn('relative size-[46px] shrink-0 overflow-hidden rounded-full', 'bg-gray-79')}
        >
          <ChatItemIcon
            className={cn('absolute left-1/2 top-[9px] h-[46px] w-[33px]', '-translate-x-1/2')}
          />
        </div>

        {/* 콘텐츠 */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {/* 뱃지 + 이름 + 안 읽음 도트 */}
          <div className="flex items-center gap-2">
            {isWithdrawn ? (
              <span className="text-body-s-400 font-medium text-text-disabled">탈퇴한 사용자</span>
            ) : (
              <>
                <span
                  className={cn(
                    'rounded-xsmall bg-brand-main px-[6px] py-[2px]',
                    'text-caption-m-400 text-gray-70',
                  )}
                >
                  {PERSONALITY_LABEL[personality]}
                </span>
                <span className="text-body-s-400 font-medium text-gray-99">{userName}</span>
              </>
            )}
          </div>

          {/* 미리보기 + 시간 */}
          <div className="flex items-center justify-between gap-5 whitespace-nowrap">
            <p className="truncate text-caption-m-400 text-gray-99">{lastMessage ?? ''}</p>
            <div className="relative shrink-0 flex items-center">
              <span className="text-caption-m-400 text-text-disabled">
                {formatRelativeTime(lastMessageAt)}
              </span>
              {isUnread && (
                <span
                  aria-label="안 읽은 메시지 있음"
                  className={cn(
                    'absolute left-[calc(100%+4px)] top-2.25 size-1.5 -translate-y-1/2',
                    'rounded-full bg-brand-main',
                  )}
                />
              )}
            </div>
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
