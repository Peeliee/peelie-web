import { useEffect } from 'react';
import { useUserStepInfo } from '@/entities/user/hooks/useUserStepInfo';
import { useHeader } from '@/shared/context/headerContext';
import { cn } from '@/shared/lib/utils';
import type { useFunnel } from '@use-funnel/react-router-dom';

interface UserStepInfoPageProps {
  onNext: () => void;
  history: ReturnType<typeof useFunnel>['history'];
}

const UserStepInfoPage = ({ onNext, history }: UserStepInfoPageProps) => {
  const { data, isError } = useUserStepInfo();
  const { hideHeader, setBackAction } = useHeader();

  const generationStatus = data?.data.generationStatus;

  const isGenerating = generationStatus !== 'DONE';

  // TODO: 일단 임시로 이동 로직 여기에 배치
  useEffect(() => {
    hideHeader(false);
    setBackAction(() => () => history.push('selectCategory', {}));

    return () => setBackAction(null);
  }, []);

  useEffect(() => {
    hideHeader(isError || isGenerating);
    return () => hideHeader(false);
  }, [isError, isGenerating, hideHeader]);

  if (isError) {
    // TODO : 에러 화면 추후 분리해서 만들기
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>정보를 불러오는 중 오류가 발생했습니다.</p>
        <button onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
  }

  if (data?.data.generationStatus !== 'DONE') {
    return (
      // TODO: 로딩 중 화면 추후 분리해서 만들기
      <div className="text-center animate-pulse">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-90">단계별 정보 생성 중</h2>
        <p className="text-sm text-gray-500">
          AI가 당신의 답변을 바탕으로 개인화된 정보를 만들고 있어요
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-6 pt-10 pb-20">
      {!isGenerating && data && (
        <div className="w-full max-w-md bg-white rounded-2xl  p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{data.data.card.stage1.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{data.data.card.stage1.subtitle}</p>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {data.data.card.stage1.content}
          </p>
          <br />
          <h2 className="text-xl font-bold text-gray-900 mb-3">{data.data.card.stage2.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{data.data.card.stage2.subtitle}</p>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {data.data.card.stage2.content}
          </p>
          <br />
          <h2 className="text-xl font-bold text-gray-900 mb-3">{data.data.card.stage3.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{data.data.card.stage3.subtitle}</p>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {data.data.card.stage3.content}
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium z-9999',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
      >
        계속하기
      </button>
    </div>
  );
};

export default UserStepInfoPage;
