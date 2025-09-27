// 온보딩 맨 첫 페이지입니다.
import { Link } from 'react-router-dom';
import MockImg from '@/assets/mockImg.svg?react';
import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';

const IntroducePeeliePage = () => {
  return (
    <div className="flex flex-col justify-between items-center py-10">
      {/* 상단 로고/텍스트 */}
      <div className="w-full text-left">
        <h1 className="text-xl font-bold">Peelie는</h1>
      </div>

      {/* 캐러셀 */}

      <CarouselWrapper variant="full">
        <MockImg className="w-80 h-80" />
        <MockImg className="w-80 h-80" />
        <MockImg className="w-80 h-80" />
      </CarouselWrapper>

      {/* 시작하기 버튼 */}

      <Link
        to="/select-category"
        className="block py-4 fixed bottom-10 left-6 right-6 bg-orange-400 text-white rounded-full text-center font-medium active:bg-orange-500"
      >
        시작하기
      </Link>
    </div>
  );
};

export default IntroducePeeliePage;
