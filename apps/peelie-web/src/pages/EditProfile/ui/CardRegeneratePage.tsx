import { useFunnel } from '@use-funnel/react-router-dom';
import { useNavigate } from 'react-router-dom';

import SelectCategoryPage from '@/pages/Onboarding/ui/SelectCategoryPage';
import CategoryQuestionPage from '@/pages/Onboarding/ui/CategoryQuestionPage';
import UserStepInfoPage from '@/pages/Onboarding/ui/UserStepInfoPage';

const CardRegeneratePage = () => {
  const navigate = useNavigate();

  const funnel = useFunnel<{
    selectCategory: Record<string, never>;
    categoryQuestion: { selected: number[] };
    userStepInfo: Record<string, never>;
  }>({
    id: 'card-regenerate-funnel',
    initial: { step: 'selectCategory', context: {} },
  });

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 pt-13"></div>

      <funnel.Render
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
            onNext={() => history.push('userStepInfo', () => ({}))}
          />
        )}
        userStepInfo={({ history }) => (
          <UserStepInfoPage
            history={history as ReturnType<typeof useFunnel>['history']}
            onNext={() => navigate('/mypage', { replace: true })}
          />
        )}
      />
    </div>
  );
};

export default CardRegeneratePage;
