import { useState } from 'react';

import { TokenIcon } from '@/shared/ui/icons/TokenIcon';

import { FriendManageBottomSheet } from './FriendManageBottomSheet';

export function QuickActions() {
  const [friendSheetOpen, setFriendSheetOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-1"
          onClick={() => setFriendSheetOpen(true)}
        >
          <TokenIcon className="size-8" />
          <span className="text-body-s-400 text-text-main">친구 관리</span>
        </button>
        <div className="h-14 w-px shrink-0 rounded-full bg-gray-30" />
        <button type="button" className="flex flex-1 flex-col items-center gap-1">
          <TokenIcon className="size-8" />
          <span className="text-body-s-400 text-text-main">토큰 관리</span>
        </button>
      </div>

      <FriendManageBottomSheet
        isOpen={friendSheetOpen}
        onClose={() => setFriendSheetOpen(false)}
      />
    </>
  );
}
