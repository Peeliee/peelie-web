import { useMemo, useCallback, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Ssgoi } from '@ssgoi/react';
import { fade, snap } from '@ssgoi/react/view-transitions';
import { NavigationBar } from '@/widgets/NavigationBar/NavigationBar';

const NAV_ROUTES = ['/', '/ai-chat', '/my'];
const NAV_ROUTE_SET = new Set<string>(NAV_ROUTES);

function resetDocumentScroll() {
  window.scrollTo(0, 0);

  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
  document.body.scrollTop = 0;
  document.body.scrollLeft = 0;
}

export default function SsgoiLayout() {
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);
  const showNav = NAV_ROUTES.includes(location.pathname);

  const usePathname = useCallback(() => location.pathname, [location.pathname]);

  useLayoutEffect(() => {
    const previousPathname = previousPathnameRef.current;
    const currentPathname = location.pathname;

    if (
      previousPathname !== currentPathname &&
      NAV_ROUTE_SET.has(previousPathname) &&
      NAV_ROUTE_SET.has(currentPathname)
    ) {
      resetDocumentScroll();
    }

    previousPathnameRef.current = currentPathname;
  }, [location.pathname]);

  const config = useMemo(
    () => ({
      middleware: (from: string, to: string) => ({
        from: from.replace(/^\/chat-room\/[^/]+/, '/chat-room'),
        to: to.replace(/^\/chat-room\/[^/]+/, '/chat-room'),
      }),
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
          overflowX: 'hidden',
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
