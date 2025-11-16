import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HeaderContext } from '@/shared/context/headerContext';
import { BackHeader, LogoHeader } from './ui/Header';

export const LogoHeaderLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <LogoHeader />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export const BackHeaderLayout = () => {
  const [isHidden, setHidden] = useState<boolean>(false);
  const [backAction, setBackAction] = useState<(() => void) | null>(null);
  const [isTransparent, setTransparent] = useState(true);

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backAction) backAction();
    else navigate(-1);
  };

  return (
    <HeaderContext.Provider value={{ hideHeader: setHidden, setBackAction, setTransparent }}>
      <div className="flex flex-col h-full">
        {!isHidden && <BackHeader onClick={handleBackClick} transparent={isTransparent} />}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </HeaderContext.Provider>
  );
};
