import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default App;
