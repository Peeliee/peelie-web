import { useFunnel } from '@use-funnel/react-router-dom';

import type { InteractionStyleKey } from '@/shared/constants/interactionStyle';

import IntroducePeeliePage from './ui/IntroducePeeliePage';
import SelectCategoryPage from './ui/SelectCategoryPage';
import CategoryQuestionPage from './ui/CategoryQuestionPage';
import UserStepInfoPage from './ui/UserStepInfoPage';
import IntroduceInteractionStylePage from './ui/IntroduceInteractionStylePage';
import SelectInteractionStylePage from './ui/SelectInteractionStylePage';
import ProfileDescriptionPage from './ui/ProfileDescriptionPage';
import FinishOnboardingPage from './ui/FinishOnboardingPage';

const OnboardingPage = () => {
  const funnel = useFunnel<{
    introducePeelie: Record<string, never>;
    selectCategory: Record<string, never>;
    categoryQuestion: { selected: number[] };
    userStepInfo: Record<string, never>;
    introduceInteraction: Record<string, never>;
    selectInteraction: Record<string, never>;
    profileDescription: { interactionStyle: InteractionStyleKey };
    finishOnboarding: { interactionStyle: InteractionStyleKey };
  }>({
    id: 'onboarding-funnel',
    initial: { step: 'introducePeelie', context: {} },
  });

  return (
    <funnel.Render
      // 소개 페이지
      introducePeelie={({ history }) => (
        <IntroducePeeliePage onNext={() => history.push('selectCategory')} />
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
        <UserStepInfoPage history={history} onNext={() => history.push('introduceInteraction')} />
      )}
      // 교류 성향 소개
      introduceInteraction={({ history }) => (
        <IntroduceInteractionStylePage onNext={() => history.push('selectInteraction')} />
      )}
      // 교류 성향 선택
      selectInteraction={({ history }) => (
        <SelectInteractionStylePage
          onNext={(interactionStyle) =>
            history.push('profileDescription', () => ({ interactionStyle }))
          }
        />
      )}
      // 한줄소개 입력
      profileDescription={({ context, history }) => (
        <ProfileDescriptionPage
          interactionStyle={context.interactionStyle}
          onNext={() => history.push('finishOnboarding')}
        />
      )}
      // 온보딩 완료
      finishOnboarding={({ context }) => (
        <FinishOnboardingPage interactionStyle={context.interactionStyle} />
      )}
    />
  );
};

export default OnboardingPage;
