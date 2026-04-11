import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { HomeIcon } from '@/shared/ui/icons/HomeIcon';
import { AiChatIcon } from '@/shared/ui/icons/AiChatIcon';
import { MyProfileIcon } from '@/shared/ui/icons/MyProfileIcon';

/**
 * 하단 네비게이션 바
 *
 * Figma variant 매핑:
 * - state: 홈 / AI챗 / 마이 — 현재 라우트 경로에서 자동 판단
 * - 활성: text-brand-main, 비활성: text-gray-30
 *
 * @see Figma node-id=4234-23931
 */

const tabs = [
  { path: '/', label: '홈', icon: HomeIcon },
  { path: '/ai-chat', label: 'AI챗', icon: AiChatIcon },
  { path: '/my', label: '마이', icon: MyProfileIcon },
] as const;

interface NavigationBarProps {
  className?: string;
}

export function NavigationBar({ className }: NavigationBarProps) {
  const { pathname } = useLocation();

  return (
    <nav className={cn('flex items-center border-t border-gray-30 bg-bg-main', className)}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              'flex flex-1 flex-col items-center justify-end h-12 gap-0.5',
              isActive ? 'text-brand-main' : 'text-gray-30',
            )}
          >
            {tab.icon === AiChatIcon ? (
              <AiChatIcon active={isActive} className="size-6" />
            ) : (
              <Icon className="size-6" />
            )}
            <span className="text-caption">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
