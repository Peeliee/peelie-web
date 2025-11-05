import {
  HorizontalUserCard,
  UserCardName,
  UserCardInteractionStyle,
  UserCardImage,
  UserCardDescription,
  UserCardFlipped,
} from '@/entities/user/ui/HorizontalUserCard';
import type { FriendResponse } from '@/entities/friend/model/friend.type';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import mockProfile from '@/assets/mockimage.png';

interface FlipUserCardProps {
  friend: FriendResponse;
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
              <UserCardInteractionStyle>
                {InteractionStyle[friend.interactionStyle]}
              </UserCardInteractionStyle>
            </div>
            {/* TODO : 기본 이미지 넣기 */}
            <UserCardImage src={friend.profileUrl || mockProfile} />
          </div>
          <UserCardDescription>{friend.bio}</UserCardDescription>
        </HorizontalUserCard>
      )}
    </div>
  );
};
