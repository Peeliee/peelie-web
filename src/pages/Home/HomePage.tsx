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
import { StepTab, StepTabs } from '@/features/user/ui/StepTabs';
import { QrModal } from '@/features/qr-scanner/ui/QrModal';
import { LogalModal } from './LogoutModal';
/* todo: QR 공유 테스트 modal 나중에 지우기 */ 
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
      <StepTabs>
        <StepTab title="STEP 1">1단계정보</StepTab>
        <StepTab title="STEP 2">2단계정보</StepTab>
        <StepTab title="STEP 3" locked>
          3단계정보
        </StepTab>
      </StepTabs>
      {/* 테스트용: QR 공유 모달 버튼. 모달 버튼 나중에 이동 */}
      <div className="mt-6">
        <QrModal
          url="https://www.figma.com"
          triggerLabel="QR 공유 테스트"
          title="QR을 스캔해주세요"
          description="교류하고자 하는 친구에게 나의 QR을 보여주세요."
          tagText="적극적인 교류자"
          userName="유지원"
        />
      </div>

      {/* 테스트용: 로그아웃 모달 */}
      <div className="mt-4">
        <LogalModal />
      </div>
    </div>
  );
};

export default HomePage;
