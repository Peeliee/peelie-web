import { useNavigate } from 'react-router-dom';
import { VerticalUserCard } from '@/shared/ui/common/Card/VerticalUserCard';
import type { FriendResponse } from '@/entities/friend/model/friend.type';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import mockImg from '@/assets/mockimage.png';
import { PeekSmallSwiperWrapper } from '@/shared/ui/common/Carousel/SwiperWrapper';

interface RandomUserCarouselProps {
  friendList: FriendResponse[];
  isLoading: boolean;
  isError: boolean;
}

export const RandomUserCarousel = ({ friendList, isLoading, isError }: RandomUserCarouselProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">랜덤 친구 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !friendList) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">랜덤 친구를 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <PeekSmallSwiperWrapper>
      {friendList.map((user) => (
        <div onClick={() => navigate(`/friend/${user.userId}`)}>
          <VerticalUserCard
            key={user.userId}
            imageSrc={user.profileUrl ?? mockImg}
            name={user.userName}
            interactionStyle={InteractionStyle[user.interactionStyle]}
            description={user.bio}
          />
        </div>
      ))}
    </PeekSmallSwiperWrapper>
  );
};
