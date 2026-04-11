import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PATH from '@/shared/constants/path';
import App from '../App';
import SsgoiLayout from '../layout/SsgoiLayout';
import HomePage from '@/pages/Home/HomePage';
import TestPage from '@/pages/Test/TestPage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [
        {
          element: <SsgoiLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'test', element: <TestPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
