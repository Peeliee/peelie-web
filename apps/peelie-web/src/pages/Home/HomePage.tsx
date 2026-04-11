import { Link } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import PATH from '@/shared/constants/path';

export default function HomePage() {
  return (
    <SsgoiTransition id="/">
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-amber-300">
        <h1 className="heading-1-medium text-gray-99">Home</h1>
        <Link to={PATH.TEST} className="body-1-regular text-brand-100 underline">
          Go to Test Page
        </Link>
      </div>
    </SsgoiTransition>
  );
}
