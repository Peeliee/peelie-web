import { useNavigate } from 'react-router-dom';
import { useKakaoAuthCode } from '@/features/auth/hooks/useKakaoAuthCode';
import { GlobalNavigationBar } from '@/widgets/GlobalNavigationBar/ui/GlobalNavigationBar';
import { ProfileShareSection } from '@/widgets/ProfileShareSection/ProfileShareSection';
import { RandomUserCarousel } from '@/widgets/RandomUserCarousel/RandomUserCarousel';

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
      </div>
      <ProfileShareSection className='mb-5' />

      <RandomUserCarousel />

      <GlobalNavigationBar />
    </div>
  );
};

export default HomePage;
