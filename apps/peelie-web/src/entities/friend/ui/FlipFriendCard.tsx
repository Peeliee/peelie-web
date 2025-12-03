import { motion } from 'framer-motion';

import {
  UserCardName,
  UserCardInteractionStyle,
  UserCardImage,
  UserCardDescription,
  UserCardFlipped,
} from '@/shared/ui/common/Card/HorizontalUserCard';
import type { FriendResponse } from '@/entities/friend/model/friend.type';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import { cn } from '@/shared/lib/utils';

interface FlipFriendCardProps {
  friend: FriendResponse;
  isFlipped: boolean;
  onFlip: () => void;
  onClick: () => void;
}

export const FlipFriendCard = ({ friend, isFlipped, onFlip, onClick }: FlipFriendCardProps) => {
  console.log(friend);
  return (
    <div onClick={onFlip} className="w-full cursor-pointer perspective-[1000px]">
      <motion.div
        className={cn(
          'w-full transition-transform duration-600 transform-3d',
          isFlipped ? 'rotate-y-180' : 'rotate-y-0',
        )}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* 앞면 */}
        <div
          className={cn(
            'w-full rounded-3xl p-6 bg-[#FFF2C9] shadow-elevation-3 flex flex-col',
            'text-gray-800',
          )}
        >
          {/* 상단 "나와의 교류 단계는 1단계" */}
          <div className="text-right detail-bold mb-3 text-peelie-gray-600">
            나와의 교류 단계는 <span className="font-bold text-peelie-primary-600">{friend.stage}단계</span>
          </div>

          <div className="flex flex-row gap-4">
            {/* 프로필 이미지 */}
            <UserCardImage
              src={friend.profileUrl ?? ''}
              className="w-32 h-32 rounded-2xl bg-peelie-gray-100 flex-shrink-0"
            />

            {/* 텍스트 영역 */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-1">
                <UserCardName className="text-lg">{friend.userName}</UserCardName>
                <UserCardInteractionStyle className="bg-peelie-primary-400 text-white px-3 py-1 rounded-full">
                  {InteractionStyle[friend.interactionStyle]}
                </UserCardInteractionStyle>
              </div>
              <UserCardDescription className="text-gray-600 leading-relaxed">
                {friend.bio}
              </UserCardDescription>
            </div>
          </div>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          <UserCardFlipped userName={friend.userName} stage={friend.stage} onClick={onClick} />
        </div>
      </motion.div>
    </div>
  );
};
