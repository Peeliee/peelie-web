import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect, useState, useEffect } from 'react';

import { UnlockModal } from '@/shared/ui/common/Modal/ModalPresets';
import { HorizontalUserCard, UserCardName } from '@/shared/ui/common/Card/HorizontalUserCard';
import { friendQuery } from '@/entities/friend/api/friend.queries';
import { InteractionStyle } from '@/shared/constants/interactionStyle';
import { useHeader } from '@/shared/context/headerContext';
import { FriendBioBubble } from '@/features/friend/ui/FriendBioBubble';
import { CoverflowSwiper } from '@/shared/ui/common/Carousel/CoverflowSwiper';
import { UserInfoCard } from '@/entities/user/ui/UserInfoCard';
import { Button } from '@/shared/ui/common/button';
import { FriendInfoBottomSheet } from '@/entities/friend/ui/FriendInfoBottomSheet';
import Background from '@/assets/friendProfileBackground.svg?react';
import Character from '@/assets/characterMock.svg?react';
import { Badge } from '@/shared/ui/common/Badge/Badge';

const stageMap = ['stage1', 'stage2', 'stage3'] as const;

const FriendPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 임시임시임시임시임시임시
  const [showTempSheet, setShowTempSheet] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useQuery(friendQuery.friendProfile(Number(id)));

  const unlockStage = location.state?.unlockStage ?? null;
  const [showUnlockedModal, setShowUnlockedModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  console.log(unlockStage);
  const [current, setCurrent] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickInfoCard = () => {
    setIsModalOpen(true);
  };

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

  const stage = user.data.stage;

  const cards = [];

  if (stage >= 1) cards.push(user.data.card.stage1);
  if (stage >= 2) cards.push(user.data.card.stage2);
  if (stage >= 3) cards.push(user.data.card.stage3);

  return (
    <div>
      <div className="pb-20">
        {/* TODO : 배경 작업 필요 */}
        <div className="relative w-full flex justify-center items-center h-[260px]">
          <Background className="absolute inset-0 w-full h-79" />

          <FriendBioBubble bio={user.data.bio} className="bottom-34 w-80" />
          <Badge className="absolute right-10 top-40" variant="green">
            {InteractionStyle[user.data.interactionStyle]}
          </Badge>
          <Character className="relative z-10 w-25 h-full top-22" />
        </div>

        <HorizontalUserCard className="mt-4 h-36 border-0 shadow-none bg-transparent">
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <UserCardName>{user.data.userName}</UserCardName>
              <div>
                나와의 교류 단계는{' '}
                <span className="font-bold text-peelie-primary-600">{user.data.stage}단계</span>
              </div>
              {/* <UserCardInteractionStyle>
                {InteractionStyle[user.data.interactionStyle]}
              </UserCardInteractionStyle> */}
            </div>
          </div>
        </HorizontalUserCard>

        <CoverflowSwiper className="w-screen" onChange={setCurrent}>
          {cards.map((card, idx) => (
            <UserInfoCard
              key={idx}
              level={idx + 1} // 1,2,3
              title={card.title}
              onClick={handleClickInfoCard}
              isActive={current === idx}
            />
          ))}
        </CoverflowSwiper>

        <Button
          variant={'primary'}
          size={'extraLarge'}
          onClick={() =>
            navigate(`/friend/${user.data.userId}/quiz?stage=${user.data.stage}`, { replace: true })
          }
          className="fixed bottom-4 inset-x-4 z-10"
        >
          교류 퀴즈 풀기
        </Button>
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
          className="z-9999"
        />
      )}

      {/* Unlock Detail 모달 (stage 2 or 3) */}
      {showDetailModal && (
        <UnlockModal
          name={user.data.userName}
          open={showDetailModal}
          stage={unlockStage}
          // type="detail"
          onClose={() => {
            setShowDetailModal(false);
            setShowTempSheet(true); // 임시
          }}
          onAction={() => {
            if (unlockStage === 3) {
              const isWebView = typeof window.ReactNativeWebView !== 'undefined';

              if (!isWebView) {
                alert('앱에서만 사용할 수 있어요.');
                return;
              }

              window.ReactNativeWebView?.postMessage(
                JSON.stringify({
                  type: 'OPEN_INSTAGRAM',
                  username: user.data.instagramId,
                }),
              );
            }
          }}
        />
      )}

      <FriendInfoBottomSheet
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        level={current + 1}
        title={user.data.card[stageMap[current]].title ?? ''}
        subTitle={user.data.card[stageMap[current]].subtitle ?? ''}
        content={user.data.card[stageMap[current]].content ?? ''}
      />

      <FriendInfoBottomSheet
        open={showTempSheet}
        onOpenChange={setShowTempSheet}
        level={unlockStage}
        title={user.data.card[stageMap[(unlockStage ?? 1) - 1]].title}
        subTitle={user.data.card[stageMap[(unlockStage ?? 1) - 1]].subtitle}
        content={user.data.card[stageMap[(unlockStage ?? 1) - 1]].content}
      />
    </div>
  );
};

export default FriendPage;
