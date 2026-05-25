import { useMemo, useState } from 'react';

import { useDeleteFriendshipMutation, useGetFriendshipsQuery } from '@/entities/friendship';
import { PERSONALITY_LABEL } from '@/shared/constants/personality';
import { useDelayedSearch } from '@/shared/hooks';
import { BottomSheet } from '@/shared/ui/common/BottomSheet';
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon';
import { MiniCharcterIcon } from '@/shared/ui/icons/MiniCharcterIcon';
import { SearchIcon } from '@/shared/ui/icons/SearchIcon';

import { FriendDeleteConfirmModal } from './FriendDeleteConfirmModal';

interface FriendManageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FriendManageBottomSheet({ isOpen, onClose }: FriendManageBottomSheetProps) {
  const { keyWord, setKeyWord, query } = useDelayedSearch();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { data: friends = [] } = useGetFriendshipsQuery();
  const { mutate: deleteFriend } = useDeleteFriendshipMutation();

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return friends;
    return friends.filter((f) => f.name.toLowerCase().includes(trimmed));
  }, [friends, query]);

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      deleteFriend(pendingDeleteId);
    }
    setPendingDeleteId(null);
  };

  return (
    <>
    <BottomSheet isOpen={isOpen} onClose={onClose} className="h-[70vh]">
      <div className="flex flex-col h-full">
        <div className="flex justify-center pb-7 pt-6">
          <span className="text-body-l-500 text-gray-99">친구 관리</span>
        </div>

        <div className="flex flex-col gap-5 px-5">
          <div className="flex items-center justify-between">
            <span className="text-body-l-500 text-gray-99">친구 목록</span>
            <button type="button" className="flex items-center gap-1">
              <span className="text-caption-m-400 text-gray-50">최신순</span>
              <ChevronDownIcon className="size-6 text-gray-50" />
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-small border border-border-main bg-bg-main px-3 py-2">
            <SearchIcon className="size-6 shrink-0 text-gray-39" />
            <input
              type="text"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              placeholder="찾고 싶은 친구를 검색해주세요."
              className="flex-1 bg-transparent text-body-m-400 text-gray-99 outline-none placeholder:text-text-disabled"
            />
          </div>
        </div>

        <div className="mt-3 flex max-h-72 flex-col gap-3 overflow-y-auto px-5 pb-20">
          {filtered.map((friend) => (
            <div key={friend.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-brand-30">
                    <MiniCharcterIcon className="size-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-caption-m-400 text-brand-50">
                      {PERSONALITY_LABEL[friend.personality]}
                    </span>
                    <span className="text-body-m-500 text-gray-99">{friend.name}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-body-s-400 text-gray-59 underline underline-offset-4"
                  onClick={() => setPendingDeleteId(friend.id)}
                >
                  삭제하기
                </button>
              </div>
              <div className="h-px bg-gray-30" />
            </div>
          ))}
        </div>

        <div className="fixed bottom-4 left-5 right-5">
          <button
            type="button"
            onClick={onClose}
            className="h-14 w-full rounded-full bg-gray-70 text-body-m-400 text-gray-01"
          >
            완료하기
          </button>
        </div>
      </div>
    </BottomSheet>
    <FriendDeleteConfirmModal
      isOpen={pendingDeleteId !== null}
      onClose={() => setPendingDeleteId(null)}
      onConfirm={handleConfirmDelete}
    />
    </>
  );
}
