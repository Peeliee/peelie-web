import { useNavigate } from 'react-router-dom';
import { ChatItemIcon } from '@/shared/ui/icons/ChatItemIcon';
import { cn } from '@/shared/lib/utils';
import PATH from '@/shared/constants/path';

export function ChatListItem() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(PATH.CHAT_ROOM)} className="flex w-full items-center gap-4 py-5 pl-5 text-left">
      {/* 아바타 */}
      <div className="relative size-[46px] shrink-0 overflow-hidden rounded-full bg-gray-79">
        <ChatItemIcon className="absolute left-1/2 top-[9px] h-[46px] w-[33px] -translate-x-1/2" />
      </div>

      {/* 콘텐츠 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* 뱃지 + 이름 */}
        <div className="flex items-center gap-2">
          <span className={cn('rounded-xsmall bg-brand-main px-[6px] py-[2px]', 'text-caption-m-400 text-gray-70')}>
            직진 본능파
          </span>
          <span className="text-body-s-400 font-medium text-gray-99">김나은</span>
        </div>

        {/* 미리보기 + 시간 */}
        <div className="flex items-center justify-between gap-3 whitespace-nowrap">
          <p className="truncate text-caption-m-400 text-gray-99">
            그럼 너는 쉬는 시간에 주로 OTT 보는 걸 즐겨
          </p>
          <span className="shrink-0 text-caption-m-400 text-text-disabled">30분 전</span>
        </div>
      </div>
    </button>
  );
}
