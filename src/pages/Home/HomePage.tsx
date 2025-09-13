import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';
import { useKakaoAuthCode } from '@/features/auth/hooks/useKakaoAuthCode';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';
import {
  UserCardHorizontal,
  UserCardImage,
  UserCardName,
  UserCardInfo,
  UserCardPersonality,
} from '@/entities/user/ui/UserHorizontalCard';
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

        <UserCardHorizontal onClick={() => console.log('clicked')}>
          <UserCardImage src="/profile.png" />
          <div>
            <UserCardName>김용희</UserCardName>
            <UserCardInfo>대화를 통해 배우고 성장하고 싶습니다</UserCardInfo>
          </div>
          <UserCardPersonality>신속형</UserCardPersonality>
        </UserCardHorizontal>
      </div>
    </div>
  );
};

export default HomePage;
