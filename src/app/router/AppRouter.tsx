import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import IntroducePeeliePage from '@/pages/Onboarding/ui/IntroducePeeliePage';
import SelectCategoryPage from '@/pages/Onboarding/ui/SelectCategoryPage';
import CategoryQuestionPage from '@/pages/Onboarding/ui/CategoryQuestionPage';
import IntroduceInteractionStylePage from '@/pages/Onboarding/ui/IntroduceInteractionStylePage';
import SelectInteractionStylePage from '@/pages/Onboarding/ui/SelectInteractionStylePage';
import FinishOnboardingPage from '@/pages/Onboarding/ui/FinishOnboardingPage';

import HomePage from '@/pages/Home/HomePage';
import PATH from '@/shared/constants/path';
import App from '../App';
import { GNBLayout } from '@/widgets/GlobalNavigationBar/GNBLayout';
import MyPage from '@/pages/mypage/MyPage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      // GNB 없는 페이지
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'intro-peelie', element: <IntroducePeeliePage /> },
        { path: 'select-category', element: <SelectCategoryPage /> },
        { path: 'category-question', element: <CategoryQuestionPage /> },
        { path: 'interaction-style', element: <IntroduceInteractionStylePage /> },
        { path: 'select-style', element: <SelectInteractionStylePage /> },
        { path: 'finish-onboarding/:id', element: <FinishOnboardingPage /> },

        // GNB 있는 페이지
        {
          element: <GNBLayout />,
          children: [
            { path: '', element: <HomePage /> },
            { path: 'mypage', element: <MyPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
