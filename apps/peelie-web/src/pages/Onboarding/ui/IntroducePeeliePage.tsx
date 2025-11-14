import { useEffect } from 'react';
import { FullSwiperWrapper } from '@/shared/ui/common/Carousel/SwiperWrapper';
import { useOnboardingProgress } from '../context/OnboardingProgressContext';
import { Button } from '@/shared/ui/common/button';

import MockImg from '@/assets/mockImg.svg?react';

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
    <div className="flex flex-col justify-between items-center">
      {/* 상단 로고/텍스트 */}

      {/* 캐러셀 */}

      <FullSwiperWrapper>
        <div className="w-full">
          <p className="heading-3-medium mt-10 ml-4">
            처음 만난 사람 앞에서 <br /> 얼마나 나를 알려줄 지 망설였다면 <br /> Peelie 는 그
            마음부터 함께 할게요{' '}
          </p>
          <div className="flex justify-center">
            <MockImg className="w-80 h-80" />
          </div>
        </div>
        <div className="w-full">
          <p className="heading-3-medium mt-10 ml-4">
            가까워질수록 <br /> 나의 마음도 조금씩 드러나요. <br />
            Peelie 는 그 흐름을 따라 함께 움직여요
          </p>
          <div className="flex justify-center">
            <MockImg className="w-80 h-80" />
          </div>
        </div>
        <div className="w-full">
          <p className="heading-3-medium mt-10 ml-4">
            부담 없이, 당신의 속도에 맞게 <br /> 천천히 당신의 리듬으로 시작해볼까요?
            <br /><br />
          </p>
          <div className="flex justify-center">
            <MockImg className="w-80 h-80" />
          </div>
        </div>
      </FullSwiperWrapper>
      {/* 시작하기 버튼 */}

      <Button
        variant={"primary"}
        size={"extraLarge"}
        onClick={onNext}
        className='fixed bottom-4 inset-x-4'
      >
        시작하기
      </Button>
    </div>
  );
};

export default IntroducePeeliePage;
