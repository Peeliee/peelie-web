import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import OnboardingPage from '@/pages/Onboarding/OnboardingPage';
import FriendPage from '@/pages/Friend/FriendPage';
import FriendListPage from '@/pages/FriendList/FriendListPage';
import HomePage from '@/pages/Home/HomePage';
import MyPage from '@/pages/mypage/MyPage';
import PATH from '@/shared/constants/path';
import { GNBLayout } from '@/app/layout/navigation/GNBLayout';
import { BackHeaderLayout, LogoHeaderLayout } from '@/app/layout/header/HeaderLayout';
import App from '../App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      // GNB 없는 페이지
      children: [
        // BackButton 있는 페이지
        {
          element: <BackHeaderLayout />,
          children: [
            { path: 'onboarding', element: <OnboardingPage /> },
            { path: 'friend/:id', element: <FriendPage /> },
            { path: 'login', element: <LoginPage /> },
          ],
        },
        // GNB 있는 페이지
        {
          element: <GNBLayout />,
          children: [
            {
              element: <LogoHeaderLayout />,
              children: [
                { path: 'mypage', element: <MyPage /> },
                { path: '', element: <HomePage /> },
                { path: 'friendslist', element: <FriendListPage /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
