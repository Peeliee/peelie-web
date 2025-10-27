import { useNavigate } from 'react-router-dom';
import { useKakaoAuthCode } from '@/features/auth/hooks/useKakaoAuthCode';
import { GlobalNavigationBar } from '@/app/layout/navigation/ui/GlobalNavigationBar';
import { ProfileShareSection } from '@/widgets/ProfileShareSection/ProfileShareSection';
import { RandomUserCarousel } from '@/widgets/RandomUserCarousel/RandomUserCarousel';
import { StepProgress } from '@/shared/ui/common/Progress/StepProgress';
import { StatusProgress } from '@/shared/ui/common/Progress/StatusProgress';

const HomePage = () => {
  const navigate = useNavigate();
  useKakaoAuthCode();

  return (
    <div style={{ color: 'black' }}>
      <div className="flex justify-center">
        <button
          className="bg-amber-400 rounded-3xl p-3 mt-0"
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인페이지로 이동하기 버튼
        </button>
        <button
          className="bg-amber-400 rounded-3xl p-3 mt-0"
          onClick={() => {
            navigate('/onboarding');
          }}
        >
          온보딩 이동하기 버튼
        </button>
      </div>

      <div className="px-3 mt-10">
        <StepProgress currentStep={2} />
        <StatusProgress currentStep={2} />
      </div>
      <ProfileShareSection className="mb-5" />

      <div className="px-4 py-3">
        <p className="text-sm text-gray-500">지금 가까워질 수 있는</p>
        <h2 className="font-semibold text-black">오늘의 랜덤 추천 친구</h2>
      </div>
      <RandomUserCarousel />

      <GlobalNavigationBar />
    </div>
  );
};

export default HomePage;
