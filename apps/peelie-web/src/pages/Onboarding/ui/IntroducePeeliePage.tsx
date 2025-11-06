import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';
import MockImg2 from '@/assets/parkjiwon.webp';
import MockImg3 from '@/assets/mockyonghee.png';

import { CoverflowCarousel } from '@/shared/ui/common/Carousel/CoverflowCarousel';

import { useOnboardingProgress } from '../context/OnboardingProgressContext';
import { useEffect } from 'react';

interface IntroducePeeliePageProps {
  onNext: () => void;
}

const IntroducePeeliePage = ({ onNext }: IntroducePeeliePageProps) => {
  const { setShowProgress } = useOnboardingProgress();

  useEffect(() => {
    setShowProgress(false);
    return () => setShowProgress(true);
  }, [setShowProgress]);

  return (
    <div className="flex flex-col justify-between items-center py-12">
      {/* 상단 로고/텍스트 */}
      <div className="w-full text-left">
        <h1 className="text-xl font-bold mt-20">Peelie는</h1>
      </div>

      {/* 캐러셀 */}

      <CoverflowCarousel>
        <MockImg className="w-80 h-80" />
        <img src={MockImg2} />
        <img src={MockImg3} className="w-40 h-40" />
      </CoverflowCarousel>
      <CarouselWrapper variant="full">
        <MockImg className="w-80 h-80" />
        <MockImg className="w-80 h-80" />
        <MockImg className="w-80 h-80" />
      </CarouselWrapper>

      {/* 시작하기 버튼 */}

      <button
        onClick={onNext}
        className="block py-4 fixed bottom-10 left-6 right-6 bg-orange-400 text-white rounded-full text-center font-medium active:bg-orange-500"
      >
        시작하기
      </button>
    </div>
  );
};

export default IntroducePeeliePage;
