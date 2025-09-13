import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';
import { useKakaoAuthCode } from '@/features/auth/hooks/useKakaoAuthCode';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';

const HomePage = () => {
  useKakaoAuthCode();

  return (
    <div style={{ color: 'black' }}>
      홈페이지
      <div className="w-full max-w-4xl mx-auto">
        {/* 임시 캐러셀 */}
        <CarouselWrapper variant="peekSmall">
          <MockImg />
          <MockImg />
          <MockImg />
          <MockImg />
        </CarouselWrapper>
        <OnboardingQuestionForm />
      </div>
    </div>
  );
};

export default HomePage;
