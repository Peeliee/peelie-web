// FriendCard.tsx

import { useState } from 'react';
import {
  HorizontalUserCard,
  UserCardName,
  UserCardPersonality,
  UserCardImage,
  UserCardDescription,
  UserCardFlipped,
} from '@/entities/user/ui/HorizontalUserCard';

interface FlipUserCardProps {
  friend: {
    userName: string;
    interactionStyle: string;
    bio: string;
    stage: number;
    profileUrl: string;
  };
}

export const FlipUserCard = ({ friend }: FlipUserCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => setIsFlipped((prev) => !prev);

  return (
    <div onClick={handleCardClick} className="w-full cursor-pointer">
      {isFlipped ? (
        <UserCardFlipped
          userName={friend.userName}
          stage={friend.stage}
          onClick={() => alert('프로필 바로가기')}
        />
      ) : (
        <HorizontalUserCard>
          <div>
            <div className="flex flex-row mb-2">
              <UserCardName>{friend.userName}</UserCardName>
              <UserCardPersonality>{friend.interactionStyle}</UserCardPersonality>
            </div>
            <UserCardImage src={friend.profileUrl} />
          </div>
          <UserCardDescription>{friend.bio}</UserCardDescription>
        </HorizontalUserCard>
      )}
    </div>
  );
};
