import { Outlet } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { HeaderContext } from '@/shared/context/headerContext';
import { BackHeader, LogoHeader } from './ui/Header';

export const LogoHeaderLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <LogoHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export const BackHeaderLayout = () => {
  const [isHidden, setHidden] = useState<boolean>(false);

  const hideHeader = useCallback((hidden: boolean) => {
    setHidden(hidden);
  }, []);

  return (
    <HeaderContext.Provider value={{ hideHeader }}>
      <div className="flex flex-col h-full">
        {!isHidden && <BackHeader />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </HeaderContext.Provider>
  );
};
