import { useEffect, useState } from 'react';
import { type useFunnel } from '@use-funnel/react-router-dom';
import { useUserStepInfo } from '@/entities/user/hooks/useUserStepInfo';
import { useHeader } from '@/shared/context/headerContext';
import { ConfirmModal } from '@/shared/ui/common/Modal/ModalPresets';
import { CoverflowSwiper } from '@/shared/ui/common/Carousel/CoverflowSwiper';
import { UserInfoCard } from '@/entities/user/ui/UserInfoCard';
import { Button } from '@/shared/ui/common/button';

import { useOnboardingProgress } from '../context/OnboardingProgressContext';

// TODO : history 타입이 이게 맞나?
interface UserStepInfoPageProps {
  onNext: () => void;
  history: ReturnType<typeof useFunnel>['history'];
}

const UserStepInfoPage = ({ onNext, history }: UserStepInfoPageProps) => {
  const { data, isError } = useUserStepInfo();
  const { hideHeader, setBackAction } = useHeader();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [current, setCurrent] = useState<number>(1);

  const { setShowProgress } = useOnboardingProgress();

  const generationStatus = data?.data.generationStatus;
  const isGenerating = generationStatus !== 'DONE';

  // TODO: 일단 임시로 이동 로직 여기에 배치
  useEffect(() => {
    hideHeader(false);
    setBackAction(() => () => setConfirmOpen(true));

    return () => setBackAction(null);
  }, []);

  const goBackToSelectCategory = () => {
    history.push('selectCategory', {});
  };

  useEffect(() => {
    hideHeader(isError || isGenerating);
    return () => hideHeader(false);
  }, [isError, isGenerating, hideHeader]);

  useEffect(() => {
    setShowProgress(generationStatus === 'DONE');
    return () => setShowProgress(true);
  }, [generationStatus, setShowProgress]);

  if (isError) {
    // TODO : 에러 화면 추후 분리해서 만들기
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>정보를 불러오는 중 오류가 발생했습니다.</p>
        <button onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
  }

  if (generationStatus !== 'DONE') {
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
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 pt-10 pb-20">
      {!isGenerating && data && (
        <CoverflowSwiper className="w-screen" onChange={setCurrent}>
          <UserInfoCard level={1} title={data.data.card.stage2.title} isActive={current === 0} />
          <UserInfoCard level={2} title={data.data.card.stage1.title} isActive={current === 1} />
          <UserInfoCard level={3} title={data.data.card.stage3.title} isActive={current === 2} />
        </CoverflowSwiper>
      )}

      <Button
        variant={'primary'}
        size={'extraLarge'}
        onClick={onNext}
        className="fixed bottom-4 inset-x-4"
      >
        계속하기
      </Button>

      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="단계별 정보가 초기화됩니다"
        description="이전 단계로 돌아가면 지금 생성된 정보는 삭제됩니다. 그래도 이동할까요?"
        firstButton={{
          text: '취소',
          variant: 'inactive',
          onClick: () => setConfirmOpen(false),
        }}
        secondButton={{
          text: '이동하기',
          variant: 'primary',
          onClick: goBackToSelectCategory,
        }}
      />
    </div>
  );
};

export default UserStepInfoPage;
