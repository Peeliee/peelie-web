import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/Home/HomePage';
import TestPage from '@/pages/Test/TestPage';
import PATH from '@/shared/constants/path';
import App from '../App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [
        { path: '', element: <HomePage /> },
        {
          path: 'test/:id',
          element: <TestPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
