import { useNavigate } from 'react-router-dom';

import { PERSONALITY_LABEL } from '@/entities/chatroom';
import type { PersonalityType } from '@/entities/chatroom';
import { AlermIcon } from '@/shared/ui/icons/AlermIcon';
import { ChatRoomProfileIcon } from '@/shared/ui/icons/ChatRoomProfileIcon';
import { cn } from '@/shared/lib/utils';

interface ChatRoomHeaderProps {
  name?: string;
  personality?: PersonalityType;
}

export function ChatRoomHeader({ name, personality }: ChatRoomHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className={cn('flex items-center justify-between pl-4 pr-5', 'pt-4')}>
        {/* 좌측: 뒤로가기 + 프로필 */}
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {/* 아바타 */}
            <div
              className={cn(
                'relative size-[46px] shrink-0 overflow-hidden rounded-full',
                'bg-brand-30',
              )}
            >
              <ChatRoomProfileIcon className="absolute left-[10px] top-[6px] h-[33px] w-[25px]" />
            </div>

            {/* 이름 + 유형 */}
            <div className="flex flex-col">
              {personality && (
                <span className="text-caption-m-400 text-brand-50">
                  {PERSONALITY_LABEL[personality]}
                </span>
              )}
              {name && <span className="text-body-m-500 text-gray-01">{name}</span>}
            </div>
          </div>
        </div>

        {/* 우측: 알람 */}
        <AlermIcon className="size-6" />
      </div>

      <div className="h-px w-full bg-border-main" />
    </div>
  );
}
