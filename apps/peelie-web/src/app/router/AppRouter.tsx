import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PATH from '@/shared/constants/path';
import App from '../App';
import SsgoiLayout from '../layout/SsgoiLayout';
import NavBarLayout from '../layout/NavBarLayout';
import HomePage from '@/pages/Home/HomePage';
import TestPage from '@/pages/Test/TestPage';
import AiChatPage from '@/pages/AiChat/AiChatPage';
import MyPage from '@/pages/My/MyPage';

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [
        {
          element: <SsgoiLayout />,
          children: [
            {
              element: <NavBarLayout />,
              children: [
                { index: true, element: <HomePage /> },
                { path: 'ai-chat', element: <AiChatPage /> },
                { path: 'my', element: <MyPage /> },
              ],
            },
            { path: 'test', element: <TestPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
