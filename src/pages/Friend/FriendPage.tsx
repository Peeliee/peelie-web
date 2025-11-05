import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';

import {
  HorizontalUserCard,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardInteractionStyle,
} from '@/shared/ui/common/Card/HorizontalUserCard';
import { friendQuery } from '@/entities/friend/api/friend.queries';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import { useHeader } from '@/shared/context/headerContext';
import Background from '@/assets/friendProfileBackground.svg?react';
import Character from '@/assets/characterMock.svg?react';
import MockImg from '@/assets/mockImg.svg';

const FriendPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useQuery(friendQuery.friendProfile(Number(id)));

  const { setTransparent } = useHeader();

  useLayoutEffect(() => {
    setTransparent?.(true);
    // 페이지 나갈 때 원래대로 복구
    return () => setTransparent?.(false);
  }, [setTransparent]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">친구 프로필을 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !user?.data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">친구 프로필을 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* TODO : 배경 작업 필요 */}
        <div className="relative w-full flex justify-center items-center h-[260px]">
          <Background className="absolute inset-0 w-full h-full" />

          <Character className="relative z-10 w-30 h-30 top-10" />
        </div>
        <HorizontalUserCard
          onClick={() => console.log('카드 클릭')}
          className="mt-4 border-0 shadow-none"
        >
          <UserCardImage src={MockImg} />
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <UserCardName>{user.data.userName}</UserCardName>
              <UserCardInteractionStyle>
                {InteractionStyle[user.data.interactionStyle]}
              </UserCardInteractionStyle>
            </div>
            <UserCardDescription>{user.data.bio}</UserCardDescription>
          </div>
        </HorizontalUserCard>

        <button
          className="fixed bottom-5 right-3 left-3 p-4 rounded-3xl bg-orange-400"
          onClick={() => alert('준비중')}
        >
          교류 퀴즈 풀기
        </button>
      </div>
    </>
  );
};

export default FriendPage;
