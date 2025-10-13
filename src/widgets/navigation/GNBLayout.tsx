import { Outlet } from 'react-router-dom';
import { GlobalNavigationBar } from './ui/GlobalNavigationBar';

export const GNBLayout = () => {
  return (
    <div className="min-h-screen pb-16">
      <Outlet />
      <GlobalNavigationBar />
    </div>
  );
};
