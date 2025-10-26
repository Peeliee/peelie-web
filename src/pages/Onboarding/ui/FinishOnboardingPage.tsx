import { useNavigate } from 'react-router-dom';
import { INTERACTION_STYLES, type InteractionStyleKey } from '@/shared/constants/interactionStyle';
import MockImg from '@/assets/mockImg.svg?react';
import { cn } from '@/shared/lib/utils';

interface FinishOnboardingPageProps {
  interactionStyle: InteractionStyleKey;
}

const FinishOnboardingPage = ({ interactionStyle }: FinishOnboardingPageProps) => {
  const navigate = useNavigate();

  const style = INTERACTION_STYLES.find((s) => s.key === interactionStyle);

  if (!style) {
    return <div>잘못된 접근</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-10">
      {/* 상단 텍스트 */}
      <div className="mb-10">
        <h1 className="text-xl font-bold leading-relaxed">
          당신의 캐릭터는 <br />
          <span className="text-orange-500">{style.title}</span>에요!
        </h1>
        <p className="mt-4 text-gray-500 text-sm">
          {style.desc}
          <br />예 : {style.title}은 어느 사람이든 관심있게 어쩌구저쩌구 특징
        </p>
      </div>

      {/* 캐릭터 이미지 */}
      <div className="flex justify-center">
        <MockImg className="w-60 h-60" />
      </div>

      {/* 하단 버튼 */}
      <button
        onClick={() => navigate('/', { replace: true })}
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
      >
        계속하기
      </button>
    </div>
  );
};

export default FinishOnboardingPage;
