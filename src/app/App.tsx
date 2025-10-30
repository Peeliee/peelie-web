import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { trackEvent } from '@/shared/lib/mixpanel';

import { QueryProvider } from './provider/QueryProvider';

const App = () => {
  useEffect(() => {
    trackEvent('app_loaded', { env: import.meta.env.MODE });
  }, []);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <main>
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </main>
  );
};

export default App;
