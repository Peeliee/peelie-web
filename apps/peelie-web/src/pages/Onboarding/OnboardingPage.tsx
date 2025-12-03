import { useFunnel } from '@use-funnel/react-router-dom';
import { useState } from 'react';

import type { InteractionStyleKey } from '@/shared/constants/interactionStyle';
import { StepProgress } from '@/shared/ui/common/Progress/StepProgress';

import { OnboardingProgressContext } from './context/OnboardingProgressContext';
import IntroducePeeliePage from './ui/IntroducePeeliePage';
import MakeProfilePage from './ui/MakeProfilePage';
import SelectCategoryPage from './ui/SelectCategoryPage';
import CategoryQuestionPage from './ui/CategoryQuestionPage';
import UserStepInfoPage from './ui/UserStepInfoPage';
import IntroduceInteractionStylePage from './ui/IntroduceInteractionStylePage';
import SelectInteractionStylePage from './ui/SelectInteractionStylePage';
import FinishOnboardingPage from './ui/FinishOnboardingPage';

const OnboardingPage = () => {
  const funnel = useFunnel<{
    introducePeelie: Record<string, never>;
    makeProfile: Record<string, never>;
    selectCategory: Record<string, never>;
    categoryQuestion: { selected: number[] };
    userStepInfo: Record<string, never>;
    introduceInteraction: Record<string, never>;
    selectInteraction: Record<string, never>;
    finishOnboarding: { interactionStyle: InteractionStyleKey };
  }>({
    id: 'onboarding-funnel',
    initial: { step: 'introducePeelie', context: {} },
  });
  const [showProgress, setShowProgress] = useState(true);

  const currentFunnelStep = funnel.step;

  const stepMap: Record<string, number> = {
    introducePeelie: 1,
    makeProfile: 1,
    selectCategory: 1,
    categoryQuestion: 2,
    userStepInfo: 3,
    introduceInteraction: 4,
    selectInteraction: 4,
    finishOnboarding: 4,
  };

  const currentStep = stepMap[currentFunnelStep] ?? 1;

  return (
    <OnboardingProgressContext.Provider value={{ showProgress, setShowProgress }}>
      <div className="flex flex-col w-full">
        <div className="px-6 pt-13">
          {showProgress && <StepProgress currentStep={currentStep} />}
        </div>

        <funnel.Render
          // 소개 페이지
          introducePeelie={({ history }) => (
            <IntroducePeeliePage onNext={() => history.push('makeProfile')} />
          )}
          makeProfile={({ history }) => (
            <MakeProfilePage onNext={() => history.push('selectCategory')} />
          )}
          // 카테고리 선택
          selectCategory={({ history }) => (
            <SelectCategoryPage
              onNext={(selectedIds) =>
                history.push('categoryQuestion', () => ({ selected: selectedIds }))
              }
            />
          )}
          // 카테고리별 질문
          categoryQuestion={({ context, history }) => (
            <CategoryQuestionPage
              selected={context.selected}
              onNext={() => history.push('userStepInfo', () => ({}))}
            />
          )}
          // 단계별 정보 열람, 수정
          userStepInfo={({ history }) => (
            <UserStepInfoPage
              // TODO : history 타입이 이게 맞나?
              history={history as ReturnType<typeof useFunnel>['history']}
              onNext={() => history.push('introduceInteraction')}
            />
          )}
          // 교류 성향 소개
          introduceInteraction={({ history }) => (
            <IntroduceInteractionStylePage onNext={() => history.push('selectInteraction')} />
          )}
          // 교류 성향 선택
          selectInteraction={({ history }) => (
            <SelectInteractionStylePage
              onNext={(interactionStyle) =>
                history.push('finishOnboarding', () => ({ interactionStyle }))
              }
            />
          )}
          // 온보딩 완료
          finishOnboarding={({ context }) => (
            <FinishOnboardingPage interactionStyle={context.interactionStyle} />
          )}
        />
      </div>
    </OnboardingProgressContext.Provider>
  );
};

export default OnboardingPage;
