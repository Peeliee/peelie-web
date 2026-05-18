import { cn } from '@/shared/lib/utils';

import { formatChatTime } from '../utils';

interface UserBubbleProps {
  content: string;
  createdAt: string;
  className?: string;
}

export function UserBubble({ content, createdAt, className }: UserBubbleProps) {
  return (
    <div className={cn('flex flex-col items-end gap-2', className)}>
      <div className={cn('max-w-[65vw] rounded-small rounded-tr-none bg-brand-30 px-3', 'py-2')}>
        <p className="whitespace-pre-line text-body-m-400 text-text-main">{content}</p>
      </div>
      <time dateTime={createdAt} className="text-caption-m-400 text-gray-39">
        {formatChatTime(createdAt)}
      </time>
    </div>
  );
}
