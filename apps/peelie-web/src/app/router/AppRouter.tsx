import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PATH from '@/shared/constants/path';
import App from '../App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <App />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
