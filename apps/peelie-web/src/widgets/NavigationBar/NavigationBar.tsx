import { useLocation, Link } from 'react-router-dom';
import { isInWebView } from '@/shared/lib/isInWebView';
import { cn } from '@/shared/lib/utils';
import { HomeIcon } from '@/shared/ui/icons/HomeIcon';
import { AiChatIcon } from '@/shared/ui/icons/AiChatIcon';
import { MyProfileIcon } from '@/shared/ui/icons/MyProfileIcon';

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
  const inWebView = isInWebView();

  return (
    <nav
      className={cn(
        'flex items-center rounded-t-md bg-gray-79',
        inWebView && 'pb-8',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              'flex flex-1 flex-col items-center justify-end h-12 gap-0.5',
              isActive ? 'text-brand-main' : 'text-gray-59',
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
