import { Link } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import PATH from '@/shared/constants/path';

const TestPage = () => {
  return (
    <SsgoiTransition id="/test">
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-amber-100">
        <h1 className="heading-1-medium text-gray-99">Test Page</h1>
        <Link
          to={PATH.HOME}
          className="body-1-regular text-brand-100 underline"
        >
          Go to Home
        </Link>
      </div>
    </SsgoiTransition>
  );
};

export default TestPage;
