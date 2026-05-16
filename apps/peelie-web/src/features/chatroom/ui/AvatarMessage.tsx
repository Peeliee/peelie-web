import { AvatarBubble } from '@/entities/chatroom';
import type { ChatBubble } from '@/entities/chatroom';
import { ChatRoomProfileIcon } from '@/shared/ui/icons/ChatRoomProfileIcon';
import { cn } from '@/shared/lib/utils';

interface AvatarMessageProps {
  bubbles: ChatBubble[];
  /** 마지막 버블 옆에만 시간 표시. */
  createdAt: string;
  name?: string;
  className?: string;
}

export function AvatarMessage({ bubbles, createdAt, name, className }: AvatarMessageProps) {
  if (bubbles.length === 0) return null;
  return (
    <div className={cn('flex flex-col items-start gap-1', className)}>
      <div className="flex items-center gap-[7px]">
        <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-gray-01">
          <ChatRoomProfileIcon className="absolute left-1.5 top-1 h-5 w-3.5" />
        </div>
        <span className="text-body-s-400 text-brand-sub-30">{name}</span>
      </div>
      {bubbles.map((bubble, i) => (
        <AvatarBubble
          key={i}
          content={bubble.text}
          createdAt={i === bubbles.length - 1 ? createdAt : undefined}
        />
      ))}
    </div>
  );
}
