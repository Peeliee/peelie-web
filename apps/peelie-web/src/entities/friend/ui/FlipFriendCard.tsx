import { motion } from 'framer-motion';

import {
  HorizontalUserCard,
  UserCardName,
  UserCardInteractionStyle,
  UserCardImage,
  UserCardDescription,
  UserCardFlipped,
} from '@/shared/ui/common/Card/HorizontalUserCard';
import type { FriendResponse } from '@/entities/friend/model/friend.type';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import { cn } from '@/shared/lib/utils';
import mockProfile from '@/assets/mockimage.png';

interface FlipFriendCardProps {
  friend: FriendResponse;
  isFlipped: boolean;
  onFlip: () => void;
  onClick: () => void;
}

export const FlipFriendCard = ({ friend, isFlipped, onFlip, onClick }: FlipFriendCardProps) => {
  return (
    <div onClick={onFlip} className="w-full cursor-pointer perspective-[1000px]">
      <motion.div
        className={cn(
          'relative w-full transition-transform duration-600 transform-3d',
          isFlipped ? 'rotate-y-180' : 'rotate-y-0',
        )}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="350"
          height="227"
          viewBox="0 0 350 227"
          fill="none"
        >
          <path
            d="M11.999 0.75H337.45C343.758 0.750251 348.833 5.9358 348.697 12.2422L344.325 215.242C344.193 221.36 339.197 226.25 333.078 226.25H16.8076C10.6983 226.25 5.70532 221.374 5.56055 215.267L0.751953 12.2666C0.604687 6.04962 5.52349 0.913022 11.7031 0.753906L11.999 0.75Z"
            fill="#FFE8A5"
            stroke="#FFD66D"
            stroke-width="1.5"
          />
        </svg>
        {/* 앞면 */}
        <div className="absolute inset-0 backface-hidden">
          <HorizontalUserCard className="trapezoid shadow-elevation-3 border-none bg-transparent">
            <div>
              <div className="flex flex-row mb-2">
                <UserCardName>{friend.userName}</UserCardName>
                <UserCardInteractionStyle>
                  {InteractionStyle[friend.interactionStyle]}
                </UserCardInteractionStyle>
              </div>
              <UserCardImage src={friend.profileUrl || mockProfile} />
            </div>
            <UserCardDescription>{friend.bio}</UserCardDescription>
          </HorizontalUserCard>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          <UserCardFlipped userName={friend.userName} stage={friend.stage} onClick={onClick} />
        </div>
      </motion.div>
    </div>
  );
};
