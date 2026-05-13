import { cn } from '@/shared/lib/utils';

import { formatChatTime } from '../utils';

interface AvatarBubbleProps {
  content: string;
  /** 마지막 버블에만 전달해 시간 표시. 중간 버블에선 undefined. */
  createdAt?: string;
  className?: string;
}

export function AvatarBubble({ content, createdAt, className }: AvatarBubbleProps) {
  return (
    <div className={cn('flex flex-col items-start gap-2 pl-8', className)}>
      <div className="max-w-[65vw] rounded-small rounded-tl-none bg-brand-sub-30 px-3 py-2">
        <p className="whitespace-pre-line text-body-m-400 text-text-main">{content}</p>
      </div>
      {createdAt && (
        <time dateTime={createdAt} className="text-caption-m-400 text-gray-39">
          {formatChatTime(createdAt)}
        </time>
      )}
    </div>
  );
}
