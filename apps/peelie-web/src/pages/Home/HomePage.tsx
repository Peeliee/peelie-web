import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { friendQuery } from '@/entities/friend/api/friend.queries';
import { GlobalNavigationBar } from '@/app/layout/navigation/ui/GlobalNavigationBar';
import { ProfileShareSection } from '@/widgets/ProfileShareSection/ProfileShareSection';
import { RandomUserCarousel } from '@/widgets/Carousel/RandomUserCarousel';

const HomePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(friendQuery.randomFriend());

  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <button
          className="bg-amber-400 rounded-3xl p-1 mt-0"
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인페이지로 이동하기 버튼
        </button>
        <button
          className="bg-amber-400 rounded-3xl p-1 mt-0"
          onClick={() => {
            navigate('/onboarding');
          }}
        >
          온보딩 이동하기 버튼
        </button>
      </div>
      <div className="p-4">
        <ProfileShareSection className="mb-1" />
      </div>

      <div className="w-full h-0.5 bg-peelie-gray-150" />
      <div className="relative h-full">
        <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-[var(--color-peelie-primary-200)] to-white pointer-events-none" />

        <div className="px-4 py-3">
          <h2 className="heading-4-medium text-peelie-gray-950">오늘의 랜덤 추천 친구</h2>
        </div>
        <RandomUserCarousel friendList={data?.data ?? []} isLoading={isLoading} isError={isError} />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default HomePage;
