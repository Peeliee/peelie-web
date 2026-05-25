import type { ReactNode } from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { cn } from '@/shared/lib/utils';
import { isInWebView } from '@/shared/lib/isInWebView';
import { clearAuthAndRedirectToLogin } from '@/shared/api/auth';
import { AlermIcon } from '@/shared/ui/icons/AlermIcon';
import { ChevronRightIcon } from '@/shared/ui/icons/ChevronRightIcon';
import { LoginIcon } from '@/shared/ui/icons/my-page/LoginIcon';
import { LogoutIcon } from '@/shared/ui/icons/my-page/LogoutIcon';
import { ProfileIcon } from '@/shared/ui/icons/my-page/ProfileIcon';

import { ProfileBanner } from './ui/ProfileBanner';
import { QuickActions } from './ui/QuickActions';

export default function MyPage() {
  const inWebView = isInWebView();

  return (
    <SsgoiTransition id="/my">
      <div className="flex flex-col min-h-dvh bg-bg-main pt-6">
        <div className={cn('shrink-0', inWebView && 'pt-10')} />
        <div className="px-5 pb-3">
          <h1 className="text-title-headline-1 text-gray-99">마이페이지</h1>
        </div>

        <div className="flex flex-col gap-5 pb-24">
          <div className="flex flex-col gap-4 px-5">
            <ProfileBanner />
            <QuickActions />
          </div>

          <div className="h-2.5 bg-bg-sub" />

          <div className="flex flex-col gap-5 px-5">
            <MenuRow icon={<ProfileIcon className="size-6 text-gray-99" />} label="개인 정보" />
            <div className="h-px bg-gray-30" />
            <MenuRow icon={<AlermIcon className="size-6 brightness-0" />} label="알림" />
            <div className="h-px bg-gray-30" />
            <MenuRow icon={<LoginIcon className="size-6 text-gray-99" />} label="로그인 관리" />
            <div className="h-px bg-gray-30" />
            <MenuRow
              icon={<LogoutIcon className="size-6 text-gray-99" />}
              label="로그아웃"
              onClick={clearAuthAndRedirectToLogin}
            />
          </div>
        </div>
      </div>
    </SsgoiTransition>
  );
}

interface MenuRowProps {
  icon: ReactNode;
  label: string;
  showChevron?: boolean;
  onClick?: () => void;
}

function MenuRow({ icon, label, showChevron = true, onClick }: MenuRowProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-body-m-500 text-gray-99">{label}</span>
      </div>
      {showChevron && (
        <button type="button" onClick={onClick} className="-mr-1 p-1">
          <ChevronRightIcon className="size-6 text-gray-99" />
        </button>
      )}
    </div>
  );
}
