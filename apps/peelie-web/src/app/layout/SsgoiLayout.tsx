import { useMemo, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Ssgoi } from '@ssgoi/react';
import { fade, drill, snap } from '@ssgoi/react/view-transitions';
import { NavigationBar } from '@/widgets/NavigationBar/NavigationBar';

const NAV_ROUTES = ['/', '/ai-chat', '/my'];

export default function SsgoiLayout() {
  const location = useLocation();
  const showNav = NAV_ROUTES.includes(location.pathname);

  const usePathname = useCallback(() => location.pathname, [location.pathname]);

  const config = useMemo(
    () => ({
      transitions: [
        // 홈 <-> ai채팅
        {
          from: '/',
          to: '/ai-chat',
          transition: snap({ direction: 'left' }),
        },
        {
          from: '/ai-chat',
          to: '/',
          transition: snap({ direction: 'right' }),
        },

        // 홈 <-> 마이페이지
        {
          from: '/',
          to: '/my',
          transition: snap({ direction: 'left' }),
        },
        {
          from: '/my',
          to: '/',
          transition: snap({ direction: 'right' }),
        },

        // ai챗 <-> 마이페이지
        {
          from: '/ai-chat',
          to: '/my',
          transition: snap({ direction: 'left' }),
        },
        {
          from: '/my',
          to: '/ai-chat',
          transition: snap({ direction: 'right' }),
        },

        {
          from: '/ai-chat',
          to: '/chat-room',
          transition: fade(),
        },
        {
          from: '/chat-room',
          to: '/ai-chat',
          transition: fade(),
        },
      ],
      defaultTransition: snap(),
    }),
    [],
  );

  return (
    <Ssgoi config={config} usePathname={usePathname}>
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <div className={showNav ? 'pb-12' : ''}>
          <Outlet />
        </div>
        {showNav && <NavigationBar className="fixed bottom-0 left-0 right-0" />}
      </div>
    </Ssgoi>
  );
}
