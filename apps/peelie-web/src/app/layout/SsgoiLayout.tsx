import { useMemo, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Ssgoi } from '@ssgoi/react';
import { fade, drill } from '@ssgoi/react/view-transitions';
import { NavigationBar } from '@/widgets/NavigationBar/NavigationBar';

export default function SsgoiLayout() {
  const location = useLocation();

  const usePathname = useCallback(() => location.pathname, [location.pathname]);

  const config = useMemo(
    () => ({
      transitions: [
        {
          from: '/',
          to: '/test',
          transition: drill({ direction: 'enter' }),
          symmetric: true
        },
        {
          from: '/test',
          to: '/',
          transition: drill({ direction: 'exit' }),
        },
      ],
      defaultTransition: fade(),
    }),
    [],
  );

  return (
    <Ssgoi config={config} usePathname={usePathname}>
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', background: 'transparent' }}>
        <div className="pb-12">
          <Outlet />
        </div>
        <NavigationBar className="fixed bottom-0 left-0 right-0" />
      </div>
    </Ssgoi>
  );
}
