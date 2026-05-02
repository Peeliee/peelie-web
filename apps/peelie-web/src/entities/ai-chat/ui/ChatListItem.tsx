import { ChatItemIcon } from '@/shared/ui/icons/ChatItemIcon';
import { cn } from '@/shared/lib/utils';

interface ChatListItemProps {
  userName: string;
  badge: string;
  lastMessage: string;
  lastMessageAt: string;
  onClick?: () => void;
}

export function ChatListItem({
  userName,
  badge,
  lastMessage,
  lastMessageAt,
  onClick,
}: ChatListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 py-5 pl-5 text-left"
    >
      {/* 아바타 */}
      <div className="relative size-[46px] shrink-0 overflow-hidden rounded-full bg-gray-79">
        <ChatItemIcon className="absolute left-1/2 top-[9px] h-[46px] w-[33px] -translate-x-1/2" />
      </div>

      {/* 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* 뱃지 + 이름 */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'rounded-xsmall bg-brand-main px-[6px] py-[2px]',
              'text-caption-m-400 text-gray-70',
            )}
          >
            {badge}
          </span>
          <span className="text-body-s-400 font-medium text-gray-99">{userName}</span>
        </div>

        {/* 미리보기 + 시간 */}
        <div className="flex items-center justify-between gap-3 whitespace-nowrap">
          <p className="truncate text-caption-m-400 text-gray-99">{lastMessage}</p>
          <span className="shrink-0 text-caption-m-400 text-text-disabled">
            {formatRelativeTime(lastMessageAt)}
          </span>
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
