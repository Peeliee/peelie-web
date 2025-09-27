import { useNavigate } from 'react-router-dom';
import { useKakaoAuthCode } from '@/features/auth/hooks/useKakaoAuthCode';
import { GlobalNavigationBar } from '@/widgets/GlobalNavigationBar/ui/GlobalNavigationBar';
import { ProfileShareSection } from '@/widgets/ProfileShareSection/ProfileShareSection';

const HomePage = () => {
  const navigate = useNavigate();
  useKakaoAuthCode();

  return (
    <div style={{ color: 'black' }}>
      <div className="flex justify-center">
        <button
          className="bg-amber-400 rounded-3xl p-10 mt-5"
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인페이지로 이동하기 버튼
        </button>
      </div>
      <ProfileShareSection />
      <GlobalNavigationBar />
    </div>
  );
};

export default HomePage;
