import type { ReactNode } from 'react';
import { SsgoiTransition } from '@ssgoi/react';

import { cn } from '@/shared/lib/utils';
import { isInWebView } from '@/shared/lib/isInWebView';
import { AlermIcon } from '@/shared/ui/icons/AlermIcon';
import { ChevronRightIcon } from '@/shared/ui/icons/ChevronRightIcon';
import { StraightForwardCharacterIcon } from '@/shared/ui/icons/character/StraightForwardCharacterIcon';
import { LoginIcon } from '@/shared/ui/icons/my-page/LoginIcon';
import { LogoutIcon } from '@/shared/ui/icons/my-page/LogoutIcon';
import { ProfileIcon } from '@/shared/ui/icons/my-page/ProfileIcon';
import { TokenIcon } from '@/shared/ui/icons/TokenIcon';

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

          <div className="h-[10px] bg-bg-sub" />

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
              showChevron={false}
            />
          </div>
        </div>
      </div>
    </SsgoiTransition>
  );
}

function ProfileBanner() {
  return (
    <div className="relative w-full h-[156px] rounded-medium overflow-hidden bg-gradient-to-b from-brand-50 to-brand-30">
      {/* 좌측: 성향 텍스트 */}
      <div className="absolute left-[22px] top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <span className="text-caption-m-400 text-text-sub">나은님의 교류성향은</span>
        <div className="flex items-end gap-0.5">
          <div>
            <p className="text-body-l-500 font-semibold text-gray-99 leading-6">망설임 없이 바로</p>
            <p className="text-body-l-500 font-semibold text-gray-99 leading-6">직진 본능파</p>
          </div>
          <span className="text-caption-m-400 text-text-sub pb-[3px]">입니다</span>
        </div>
      </div>

      {/* 우측: 캐릭터 + 툴팁 + 편집 버튼 */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center w-[112px]">
        <div className="shadow-tooltip z-[2] mb-[-8px]">
          <div className="bg-gray-70 rounded-xsmall px-2 py-1.5">
            <span className="text-caption-m-400 text-gray-01 whitespace-nowrap">
              나는 직진 본능파
            </span>
          </div>
          <div className="flex justify-center">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-70" />
          </div>
        </div>

        <div className="relative z-[1] flex items-end">
          <div className="relative size-[100px] rounded-full bg-gray-01 shadow-profile overflow-hidden shrink-0 mr-[-20px]">
            <StraightForwardCharacterIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55px]" />
          </div>
          <button
            type="button"
            className="relative shrink-0 bg-brand-50 border border-brand-100 rounded-full p-2"
          >
            <PencilIcon className="size-4 text-gray-79" />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="flex items-center justify-center">
      <button type="button" className="flex flex-col items-center gap-1 flex-1">
        <TokenIcon className="size-8" />
        <span className="text-body-s-400 text-text-main">친구 관리</span>
      </button>
      <div className="w-px h-14 bg-gray-30 rounded-full shrink-0" />
      <button type="button" className="flex flex-col items-center gap-1 flex-1">
        <TokenIcon className="size-8" />
        <span className="text-body-s-400 text-text-main">토큰 관리</span>
      </button>
    </div>
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
    <button type="button" onClick={onClick} className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-body-m-500 text-gray-99">{label}</span>
      </div>
      {showChevron && <ChevronRightIcon className="size-6 text-gray-99" />}
    </button>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M11.333 2a1.414 1.414 0 0 1 2 2L5 12.333 2 13.333l1-3L11.333 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
