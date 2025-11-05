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
          'relative w-full transition-transform duration-500 [transform-style:preserve-3d]',
          isFlipped ? 'rotate-y-180' : 'rotate-y-0',
        )}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 backface-hidden">
          <HorizontalUserCard>
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
