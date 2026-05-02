import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PATH from '@/shared/constants/path';
import App from '../App';
import SsgoiLayout from '../layout/SsgoiLayout';
import HomePage from '@/pages/Home/HomePage';
import TestPage from '@/pages/Test/TestPage';
import AiChatPage from '@/pages/AiChat/AiChatPage';
import ChatRoomPage from '@/pages/ChatRoom/ChatRoomPage';
import MyPage from '@/pages/My/MyPage';
import LoginPage from '@/pages/Login/LoginPage';

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [
        {
          element: <SsgoiLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'ai-chat', element: <AiChatPage /> },
            { path: 'my', element: <MyPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'chat-room/:chatRoomPublicId', element: <ChatRoomPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
