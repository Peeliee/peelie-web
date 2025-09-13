import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';
import { useKakaoAuthCode } from '@/features/auth/hooks/useKakaoAuthCode';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';
import {
  UserCardHorizontal,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardPersonality,
} from '@/entities/user/ui/UserCardHorizontal';
import { UserCardVertical } from '@/entities/user/ui/UserCardVertical';

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
           {/* <UserCardVertical
          imageSrc="/김용희.png"
          name="김용희"
          personality="신중형"
          description="대화를 통해 배우고, 나누며 성장하고 싶습니다."
        />
         <UserCardVertical
          imageSrc="/김용희.png"
          name="김용희"
          personality="신중형"
          description="대화를 통해 배우고, 나누며 성장하고 싶습니다."
        />
         <UserCardVertical
          imageSrc="/김용희.png"
          name="김용희"
          personality="신중형"
          description="대화를 통해 배우고, 나누며 성장하고 싶습니다."
        /> */}

        </CarouselWrapper>
        <OnboardingQuestionForm />
       
        <UserCardHorizontal onClick={() => console.log('clicked')}>
          <UserCardImage src="/profile.png" />
          <div>
            <UserCardName>김용희</UserCardName>
            <UserCardDescription>대화를 통해 배우고 성장하고 싶습니다</UserCardDescription>
          </div>
          <UserCardPersonality>신속형</UserCardPersonality>
        </UserCardHorizontal>

        <UserCardVertical
          imageSrc="/김용희.png"
          name="김용희"
          personality="신중형"
          description="대화를 통해 배우고, 나누며 성장하고 싶습니다."
        />
      </div>
    </div>
  );
};

export default HomePage;
