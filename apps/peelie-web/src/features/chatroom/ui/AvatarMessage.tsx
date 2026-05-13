import { AvatarBubble } from '@/entities/chatroom';
import type { ChatBubble } from '@/entities/chatroom';
import { ChatRoomProfileIcon } from '@/shared/ui/icons/ChatRoomProfileIcon';
import { cn } from '@/shared/lib/utils';

import { SuggestionList } from './SuggestionList';

interface AvatarMessageProps {
  bubbles: ChatBubble[];
  /** 마지막 버블 옆에만 시간 표시. */
  createdAt: string;
  suggestions?: string[];
  /** 있으면 chip 으로 노출 + 클릭 시 호출. 없으면 chip 자체 렌더 안 함. */
  onSuggestionSelect?: (text: string) => void;
  className?: string;
}

const BOT_NAME = 'POKI봇';

export function AvatarMessage({
  bubbles,
  createdAt,
  suggestions,
  onSuggestionSelect,
  className,
}: AvatarMessageProps) {
  if (bubbles.length === 0) return null;
  return (
    <div className={cn('flex flex-col items-start gap-1', className)}>
      <div className="flex items-center gap-[7px]">
        <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-gray-01">
          <ChatRoomProfileIcon className="absolute left-1.5 top-1 h-5 w-3.5" />
        </div>
        <span className="text-body-s-400 text-brand-sub-30">{BOT_NAME}</span>
      </div>
      {bubbles.map((bubble, i) => (
        <AvatarBubble
          key={i}
          content={bubble.text}
          createdAt={i === bubbles.length - 1 ? createdAt : undefined}
        />
      ))}
      {suggestions && suggestions.length > 0 && onSuggestionSelect && (
        <SuggestionList suggestions={suggestions} onSelect={onSuggestionSelect} />
      )}
    </div>
  );
}
