import { AvatarBubble } from '@/entities/chatroom';
import { ChatRoomProfileIcon } from '@/shared/ui/icons/ChatRoomProfileIcon';
import { cn } from '@/shared/lib/utils';

interface AvatarMessageProps {
  content: string;
  createdAt: string;
  className?: string;
}

const BOT_NAME = 'POKI봇';

export function AvatarMessage({ content, createdAt, className }: AvatarMessageProps) {
  return (
    <div className={cn('flex flex-col items-start gap-1', className)}>
      <div className="flex items-center gap-[7px]">
        <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-gray-01">
          <ChatRoomProfileIcon className="absolute left-1.5 top-1 h-5 w-3.5" />
        </div>
        <span className="text-body-s-400 text-brand-sub-30">{BOT_NAME}</span>
      </div>
      <AvatarBubble content={content} createdAt={createdAt} />
    </div>
  );
}
