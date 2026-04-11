import { Outlet } from 'react-router-dom';
import { NavigationBar } from '@/widgets/NavigationBar/NavigationBar';

export default function NavBarLayout() {
  return (
    <>
      <div className="pb-12">
        <Outlet />
      </div>
      <NavigationBar className="fixed bottom-0 left-0 right-0" />
    </>
  );
}
