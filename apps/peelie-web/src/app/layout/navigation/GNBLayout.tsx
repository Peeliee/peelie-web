import { Outlet } from 'react-router-dom';
import { GlobalNavigationBar } from './ui/GlobalNavigationBar';

export const GNBLayout = () => {
  return (
    <div className="flex flex-col mb-14">
      <Outlet />
      <GlobalNavigationBar />
    </div>
  );
};
