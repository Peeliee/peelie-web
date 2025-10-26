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
    userStepInfoPage: Record<string, never>;
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
      introducePeelie={({ history }) => (
        <IntroducePeeliePage onNext={() => history.push('selectCategory')} />
      )}
      selectCategory={({ history }) => (
        <SelectCategoryPage
          onNext={(selectedIds) =>
            history.push('categoryQuestion', () => ({ selected: selectedIds }))
          }
        />
      )}
      categoryQuestion={({ context, history }) => (
        <CategoryQuestionPage
          selected={context.selected}
          onNext={() => history.push('userStepInfoPage', () => ({}))}
        />
      )}
      userStepInfoPage={({ history }) => (
        <UserStepInfoPage onNext={() => history.push('introduceInteraction')} />
      )}
      introduceInteraction={({ history }) => (
        <IntroduceInteractionStylePage onNext={() => history.push('selectInteraction')} />
      )}
      selectInteraction={({ history }) => (
        <SelectInteractionStylePage
          onNext={(interactionStyle) =>
            history.push('profileDescription', () => ({ interactionStyle }))
          }
        />
      )}
      profileDescription={({ context, history }) => (
        <ProfileDescriptionPage
          interactionStyle={context.interactionStyle}
          onNext={() => history.push('finishOnboarding')}
        />
      )}
      finishOnboarding={({ context }) => (
        <FinishOnboardingPage interactionStyle={context.interactionStyle} />
      )}
    />
  );
};

export default OnboardingPage;
