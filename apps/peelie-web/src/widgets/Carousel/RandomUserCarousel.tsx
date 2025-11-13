import { useNavigate } from 'react-router-dom';
import { VerticalUserCard } from '@/shared/ui/common/Card/VerticalUserCard';
import type { FriendResponse } from '@/entities/friend/model/friend.type';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import { PeekSmallSwiperWrapper } from '@/shared/ui/common/Carousel/SwiperWrapper';
import CharacterShadow from '@/assets/character/friendCardShadow.svg?react';
import { QrModal } from '@/shared/ui/common/Modal/ModalPresets';
import EmptyCard from '@/assets/character/emptyCard.svg?react';
import mockImg from '@/assets/mockimage.png';

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

  if (!friendList.length) {
    return (
      <div className="flex w-full justify-center mt-5">
        <EmptyCard className="absolute left-10 top-15 z-0" />

        <div className="relative flex flex-col w-65 h-98.5 bg-[#F1F1F1] p-4 rounded-400 z-10">
          <div className="flex flex-col w-full h-full mb-5 bg-[#FFF] rounded-400 text-peelie-gray-500 items-center justify-center z-10 relative">
            <p className="z-30">추천할 친구가 없어요</p>
            <p className="z-30">정보가 궁금한 친구를 추가해봐요</p>
            <CharacterShadow className="absolute bottom-16 z-20" />
          </div>

          <QrModal url="https://naver.com" className="z-30">
            내 QR 공유하기
          </QrModal>
        </div>
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
            className="bg-white"
          />
        </div>
      ))}
    </PeekSmallSwiperWrapper>
  );
};
