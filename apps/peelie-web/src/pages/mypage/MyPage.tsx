import { useUser } from '@/app/provider/userContext';
import { Button } from '@/shared/ui/common/button';
import { CoverflowCarousel } from '@/shared/ui/common/Carousel/CoverflowCarousel';

import MockImg from '@/assets/mockImg.svg?react';
import MockImg2 from '@/assets/parkjiwon.webp';
import MockImg3 from '@/assets/mockyonghee.png';

const MyPage = () => {
  const { user } = useUser();

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

      <Button size={'large'} className="w-full">
        프로필 편집
      </Button>

      <div className="w-screen h-0.5 bg-peelie-gray-150 mt-4 mb-4" />

      <p className="flex w-full justify-start heading-4-medium mb-4">나의 단계별 교류 카드</p>
      <CoverflowCarousel>
        <MockImg className="w-40 h-40" />
        <img src={MockImg2} />
        <img src={MockImg3} className="w-40 h-40" />
      </CoverflowCarousel>
    </div>
  );
};

export default MyPage;
