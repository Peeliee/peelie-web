import { ChatRoomProfileIcon } from '@/shared/ui/icons/ChatRoomProfileIcon';
import { cn } from '@/shared/lib/utils';

interface AvatarTypingBubbleProps {
  /** 직전에 AvatarMessage 가 없는 경우(헤더 미표시 상황)에만 true 로 전달. */
  showHeader?: boolean;
  className?: string;
}

const BOT_NAME = 'POKI봇';

export function AvatarTypingBubble({ showHeader, className }: AvatarTypingBubbleProps) {
  return (
    <div className={cn('flex flex-col items-start gap-1', className)}>
      {showHeader && (
        <div className="flex items-center gap-[7px]">
          <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-gray-01">
            <ChatRoomProfileIcon className="absolute left-1.5 top-1 h-5 w-3.5" />
          </div>
          <span className="text-body-s-400 text-brand-sub-30">{BOT_NAME}</span>
        </div>
      )}
      <div className="pl-8">
        <div
          className="inline-flex items-center gap-1 rounded-small rounded-tl-none bg-brand-sub-30 px-3 py-3"
          aria-label="응답 작성 중"
        >
          <Dot delay="0ms" />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-gray-70"
      style={{ animationDelay: delay }}
    />
  );
}
