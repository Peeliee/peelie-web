import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Login/LoginPage';
import IntroducePeeliePage from '@/pages/Onboarding/ui/IntroducePeeliePage';
import SelectCategoryPage from '@/pages/Onboarding/ui/SelectCategoryPage';
import CategoryQuestionPage from '@/pages/Onboarding/ui/CategoryQuestionPage';
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
        { path: 'login', element: <LoginPage /> },
        { path: 'intro-peelie', element: <IntroducePeeliePage /> },
        { path: 'select-category', element: <SelectCategoryPage /> },
        { path: 'category-question', element: <CategoryQuestionPage /> },
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
