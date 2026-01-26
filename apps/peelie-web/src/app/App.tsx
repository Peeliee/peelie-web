import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { getSocket } from '@/shared/socket/socket';

import { QueryProvider } from './provider/QueryProvider';
import { UserProvider } from './provider/userContext';

export function useDevSocketConnect() {
  useEffect(() => {
    if (import.meta.env.MODE !== 'development') return;

    const s = getSocket();
    s.connect();

    return () => {
      s.disconnect();
    };
  }, []);
}

const App = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);
  // useDevSocketConnect();
  return (
    <main>
      <QueryProvider>
        <UserProvider>
          <Outlet />
        </UserProvider>
      </QueryProvider>
    </main>
  );
};

export default App;
