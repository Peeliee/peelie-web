import { Outlet } from 'react-router-dom';
import { GlobalNavigationBar } from './ui/GlobalNavigationBar';

export const GNBLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
      <GlobalNavigationBar />
    </div>
  );
};
