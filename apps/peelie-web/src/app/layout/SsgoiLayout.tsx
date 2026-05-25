import { useMemo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Ssgoi } from '@ssgoi/react';
import { fade, snap } from '@ssgoi/react/view-transitions';
import { useBridgeEvent } from '@/app/provider/BridgeProvider';
import { NavigationBar } from '@/widgets/NavigationBar/NavigationBar';
import { FriendCodeModal } from '@/widgets/FriendCodeModal';
import { ScheduleModal } from '@/widgets/ScheduleModal';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/common/button';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { isInWebView } from '@/shared/lib/isInWebView';

const NAV_ROUTES = ['/', '/ai-chat', '/my'];
const NAV_ROUTE_SET = new Set<string>(NAV_ROUTES);

interface SsgoiLayoutOutletContext {
  openFriendCodeModal: () => void;
}

export default function SsgoiLayout() {
  const inWebView = isInWebView();

  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);
  const routeScrollRef = useRef<HTMLDivElement>(null);
  const [isFriendCodeOpen, setIsFriendCodeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [pendingInviteCode, setPendingInviteCode] = useState<string | null>(null);

  useBridgeEvent('DEEP_LINK_INVITE', ({ code }) => {
    console.log('[deeplink-web] received DEEP_LINK_INVITE code =', code);
    setPendingInviteCode(code);
    setIsFriendCodeOpen(true);
  });
  const showNav = NAV_ROUTES.includes(location.pathname);
  const showHomeFloatingAction = location.pathname === '/';

  const usePathname = useCallback(() => location.pathname, [location.pathname]);
  const outletContext = useMemo<SsgoiLayoutOutletContext>(
    () => ({
      openFriendCodeModal: () => setIsFriendCodeOpen(true),
    }),
    [],
  );

  useLayoutEffect(() => {
    const previousPathname = previousPathnameRef.current;
    const currentPathname = location.pathname;

    if (previousPathname !== currentPathname && NAV_ROUTE_SET.has(currentPathname)) {
      routeScrollRef.current?.scrollTo({ top: 0, left: 0 });
    }

    previousPathnameRef.current = currentPathname;
  }, [location.pathname]);

  const config = useMemo(
    () => ({
      middleware: (from: string, to: string) => ({
        from: from.replace(/^\/chat-room\/[^/]+/, '/chat-room'),
        to: to.replace(/^\/chat-room\/[^/]+/, '/chat-room'),
      }),
      preserveScroll: false,
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

        // 홈 <-> 채팅룸
        {
          from: '/',
          to: '/chat-room',
          transition: fade(),
        },
        {
          from: '/chat-room',
          to: '/',
          transition: fade(),
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
          // transition: drill({direction: "enter"}),
        },
        {
          from: '/chat-room',
          to: '/ai-chat',
          transition: fade(),
          // transition: drill({direction: "exit"}),
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
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <div
          id="route-scroll-container"
          ref={routeScrollRef}
          className="relative h-full overflow-y-auto overflow-x-hidden"
        >
          <div className={showNav ? 'pb-12' : ''}>
            <Outlet context={outletContext} />
          </div>
        </div>
        {showHomeFloatingAction && (
          <Button
            size="lg"
            radius="full"
            iconLeft={<PlusIcon />}
            onClick={() => setIsScheduleOpen(true)}
            className={cn(
              'fixed bottom-[60px] left-1/2 z-20 px-4',
              'animate-[home-fab-in_200ms_ease-in_200ms_both]',
              inWebView && 'mb-8',
            )}
          >
            일정 추가하기
          </Button>
        )}
        {showNav && <NavigationBar className="fixed bottom-0 left-0 right-0" />}
        <FriendCodeModal
          isOpen={isFriendCodeOpen}
          onClose={() => {
            setIsFriendCodeOpen(false);
            setPendingInviteCode(null);
          }}
          initialCode={pendingInviteCode ?? undefined}
        />
        <ScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          onAddFriend={() => {
            setIsScheduleOpen(false);
            setIsFriendCodeOpen(true);
          }}
        />
      </div>
    </Ssgoi>
  );
}
