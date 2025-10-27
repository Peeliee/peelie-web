import { Outlet } from 'react-router-dom';
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
  return (
    <div className="flex flex-col h-full">
      <BackHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
