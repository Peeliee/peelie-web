import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { QueryProvider } from './provider/QueryProvider';
import { UserProvider } from './provider/userContext';

const App = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

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
