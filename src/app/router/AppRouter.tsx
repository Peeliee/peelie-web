import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import OnboardingPage from '@/pages/Onboarding/OnboardingPage';
import FriendPage from '@/pages/Friend/FriendPage';
import { FriendList } from '@/pages/FriendList/FriendList';
import HomePage from '@/pages/Home/HomePage';
import MyPage from '@/pages/mypage/MyPage';
import PATH from '@/shared/constants/path';
import App from '../App';
import { GNBLayout } from '@/app/layout/navigation/GNBLayout';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      // GNB 없는 페이지
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'onboarding', element: <OnboardingPage /> },
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
