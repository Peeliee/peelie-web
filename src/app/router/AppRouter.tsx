import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import IntroducePeeliePage from '@/pages/Onboarding/ui/IntroducePeeliePage';
import SelectCategoryPage from '@/pages/Onboarding/ui/SelectCategoryPage';
import CategoryQuestionPage from '@/pages/Onboarding/ui/CategoryQuestionPage';
import IntroduceInteractionStylePage from '@/pages/Onboarding/ui/IntroduceInteractionStylePage';
import SelectInteractionStylePage from '@/pages/Onboarding/ui/SelectInteractionStylePage';
import FinishOnboardingPage from '@/pages/Onboarding/ui/FinishOnboardingPage';
import FriendPage from '@/pages/Friend/FriendPage';
import { FriendList } from '@/pages/FriendList/FriendList';

import HomePage from '@/pages/Home/HomePage';
import MyPage from '@/pages/mypage/MyPage';
import PATH from '@/shared/constants/path';
import App from '../App';
import { GNBLayout } from '@/widgets/GlobalNavigationBar/GNBLayout';

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
        { path: 'friend/:id', element: <FriendPage /> },
        // GNB 있는 페이지
        {
          element: <GNBLayout />,
          children: [
            { path: '', element: <HomePage /> },
            { path: 'friends', element: <FriendList /> }, // 친구 목록
            { path: 'mypage', element: <MyPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
