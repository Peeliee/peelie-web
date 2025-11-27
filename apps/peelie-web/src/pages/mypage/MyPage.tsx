import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useUser } from '@/app/provider/userContext';
import { Button } from '@/shared/ui/common/button';
import { CoverflowSwiper } from '@/shared/ui/common/Carousel/CoverflowSwiper';
import { UserInfoCard } from '@/entities/user/ui/UserInfoCard';
import { UserInfoModal } from '@/features/user/ui/UserInfoModal';

const stageMap = ['stage1', 'stage2', 'stage3'] as const;

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [current, setCurrent] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickInfoCard = () => {
    setIsModalOpen(true);
  };

  if (!user) return;

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex justify-center">
        <p className="heading-4-medium">마이페이지</p>
      </div>
      <img src={user?.profileImageUrl ?? ''} className="w-50 h-50" />
      <p>{user?.userName}</p>
      <span>기본 자기소개 {user?.bio[0].bio}</span>
      <span> 1단계 자기소개 {user?.bio[1].bio}</span>
      <span>2단계 자기소개 {user?.bio[2].bio}</span>
      <span>3단계 자기소개 {user?.bio[3].bio}</span>

      <Button size={'large'} className="w-full" onClick={() => navigate('edit-profile')}>
        프로필 편집
      </Button>

      <div className="w-screen h-0.5 bg-peelie-gray-150 mt-4 mb-4" />

      <p className="flex w-full justify-start heading-4-medium mb-4">나의 단계별 교류 카드</p>
      <CoverflowSwiper className='w-screen' onChange={setCurrent}>
        <UserInfoCard
          level={1}
          title={user.card.stage1.title}
          onClick={handleClickInfoCard}
          isActive={current === 0}
        />
        <UserInfoCard
          level={2}
          title={user.card.stage2.title}
          onClick={handleClickInfoCard}
          isActive={current === 1}
        />
        <UserInfoCard
          level={3}
          title={user.card.stage3.title}
          onClick={handleClickInfoCard}
          isActive={current === 2}
        />
      </CoverflowSwiper>

      <UserInfoModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={user.card[stageMap[current]].title ?? ''}
        subTitle={user.card[stageMap[current]].subtitle ?? ''}
        content={user.card[stageMap[current]].content ?? ''}
      />
    </div>
  );
};

export default MyPage;
