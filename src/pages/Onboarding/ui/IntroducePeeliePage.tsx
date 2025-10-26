import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { onboardingPost } from '@/entities/onboarding/api/onboarding-post';
import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';

interface IntroducePeeliePageProps {
  onNext: () => void;
}

const IntroducePeeliePage = ({ onNext }: IntroducePeeliePageProps) => {
  const { mutate: startOnboarding } = useMutation({
    mutationFn: onboardingPost.startOnboarding,
    onSuccess: (data) => {
      console.log('온보딩 post 성공 : ', data);
    },
    onError: (err) => {
      console.log('온보딩 post 실패 : ', err);
    },
  });

  useEffect(() => {
    startOnboarding();
  }, [startOnboarding]);

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
