import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect, useState, useEffect } from 'react';

import { UnlockModal } from '@/shared/ui/common/Modal/ModalPresets';
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
import { FriendBioBubble } from '@/features/friend/ui/FriendBioBubble';
import Background from '@/assets/friendProfileBackground.svg?react';
import Character from '@/assets/characterMock.svg?react';
import MockImg from '@/assets/mockImg.svg';

const FriendPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useQuery(friendQuery.friendProfile(Number(id)));

  const unlockStage = location.state?.unlockStage ?? null;
  const [showUnlockedModal, setShowUnlockedModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  console.log('unlockStage : ', unlockStage);
  console.log('showUnlockedModal : ', showUnlockedModal);
  console.log('showDetailModal : ', showDetailModal);
  const { setTransparent } = useHeader();

  useLayoutEffect(() => {
    setTransparent?.(true);
    // 페이지 나갈 때 원래대로 복구
    return () => setTransparent?.(false);
  }, [setTransparent]);

  useEffect(() => {
    if (unlockStage !== null) {
      setShowUnlockedModal(true);
    }
  }, [unlockStage]);

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
    <div>
      <div className="relative">
        {/* TODO : 배경 작업 필요 */}
        <div className="relative w-full flex justify-center items-center h-[260px]">
          <Background className="absolute inset-0 w-full h-79" />

          <FriendBioBubble bio={user.data.bio} className="bottom-34 w-80" />

          <Character className="relative z-10 w-25 h-full top-22" />
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
            <UserCardDescription>test</UserCardDescription>
          </div>
        </HorizontalUserCard>

        {/* <UnlockModal
          name={user.data.userName}
          open={true}
          stage={3}
          // type="primary"
          onClose={() => {

          }}
        /> */}
        <button
          className="fixed bottom-5 right-3 left-3 p-4 rounded-3xl bg-orange-400"
          onClick={() =>
            navigate(`/friend/${user.data.userId}/quiz?stage=${user.data.stage}`, { replace: true })
          }
        >
          교류 퀴즈 풀기
        </button>
      </div>
      {showUnlockedModal && (
        <UnlockModal
          name={user.data.userName}
          stage={1}
          // type="primary"
          open={showUnlockedModal}
          onClose={() => {
            setShowUnlockedModal(false);
            setShowDetailModal(true);
          }}
        />
      )}

      {/* Unlock Detail 모달 (stage 2 or 3) */}
      {showDetailModal && (
        <UnlockModal
          name={user.data.userName}
          open={showDetailModal}
          stage={unlockStage}
          // type="detail"
          onClose={() => setShowDetailModal(false)}
          onAction={() => {
            if (unlockStage === 3) {
              window.location.href = `https://instagram.com/${user.data.instagramId}`;
            }
          }}
        />
      )}
    </div>
  );
};

export default FriendPage;
