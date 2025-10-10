import { useFunnel } from '@use-funnel/react-router-dom';

import IntroducePeeliePage from './ui/IntroducePeeliePage';
import SelectCategoryPage from './ui/SelectCategoryPage';
import CategoryQuestionPage from './ui/CategoryQuestionPage';
import IntroduceInteractionStylePage from './ui/IntroduceInteractionStylePage';
import SelectInteractionStylePage from './ui/SelectInteractionStylePage';
import FinishOnboardingPage from './ui/FinishOnboardingPage';

const OnboardingPage = () => {
  const funnel = useFunnel<{
    introducePeelie: Record<string, never>;
    selectCategory: Record<string, never>;
    categoryQuestion: { selected: number[] };
    introduceInteraction: Record<string, never>;
    selectInteraction: Record<string, never>;
    finishOnboarding: { interactionType: string };
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
          onNext={() => history.push('introduceInteraction', () => ({}))}
        />
      )}
      introduceInteraction={({ history }) => (
        <IntroduceInteractionStylePage onNext={() => history.push('selectInteraction')} />
      )}
      selectInteraction={({ history }) => (
        <SelectInteractionStylePage
          onNext={(interactionType) =>
            history.push('finishOnboarding', () => ({ interactionType }))
          }
        />
      )}
      finishOnboarding={({ context }) => (
        <FinishOnboardingPage interactionType={context.interactionType} />
      )}
    />
  );
};

export default OnboardingPage;
