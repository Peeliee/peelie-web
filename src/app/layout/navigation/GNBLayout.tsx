import { Outlet } from 'react-router-dom';
import { GlobalNavigationBar } from './ui/GlobalNavigationBar';

export const GNBLayout = () => {
  return (
    <div className="flex flex-col h-screen z-[9999]" style={{ transform: 'translateZ(0)' }}>
      <Outlet />
      <GlobalNavigationBar />
    </div>
  );
};
