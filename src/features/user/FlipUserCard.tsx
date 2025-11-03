// FriendCard.tsx

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
    userId: number;
    userName: string;
    interactionStyle: string;
    bio: string;
    stage: number;
    profileUrl: string;
  };
  isFlipped: boolean;
  onFlip: () => void;
  onClick: () => void;
}

export const FlipUserCard = ({ friend, isFlipped, onFlip, onClick }: FlipUserCardProps) => {
  return (
    <div onClick={onFlip} className="w-full cursor-pointer">
      {isFlipped ? (
        <UserCardFlipped userName={friend.userName} stage={friend.stage} onClick={onClick} />
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
