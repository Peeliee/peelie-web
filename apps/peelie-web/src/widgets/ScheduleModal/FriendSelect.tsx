import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/shared/ui/icons/ChevronUpIcon';
import type { Friend } from './types';

interface FriendSelectProps {
  friends: Friend[];
  selected: Friend | null;
  onSelect: (friend: Friend) => void;
}

export function FriendSelect({ friends, selected, onSelect }: FriendSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (friends.length === 0) {
    return (
      <div
        className={cn(
          'flex h-14 w-full flex-col justify-center',
          'rounded-small border border-border-main px-3 py-2',
        )}
      >
        <p className="text-caption-m-400 text-text-disabled">이름</p>
        <p className="text-body-s-400 text-text-disabled">친구가 없어요!</p>
      </div>
    );
  }

  const handleSelect = (friend: Friend) => {
    onSelect(friend);
    setIsOpen(false);
  };

  const unselectedFriends = friends.filter((f) => f.id !== selected?.id);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex h-14 w-full flex-col justify-center rounded-small border px-3 py-2 text-left transition-colors',
          isOpen || selected ? 'border-brand-50' : 'border-border-main',
        )}
      >
        <span className="text-caption-m-400 text-text-disabled">이름</span>
        <div className="flex w-full items-end justify-between">
          <span className={cn('text-body-s-400', selected ? 'text-text-main' : 'text-text-sub')}>
            {selected?.name ?? '친구를 선택해주세요.'}
          </span>
          {isOpen ? (
            <ChevronUpIcon className="size-6 text-text-main" />
          ) : (
            <ChevronDownIcon className="size-6 text-text-main" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn(
              'absolute left-0 right-0 top-full z-10',
              'mt-1 overflow-y-auto rounded-small border border-border-main',
              'bg-gray-01 shadow-card-02 show-scrollbar',
              'max-h-[192px] border-none',
            )}
          >
            {unselectedFriends.map((friend) => (
              <li key={friend.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(friend)}
                  className="flex h-12 w-full items-center px-3 text-body-s-400 text-text-main hover:bg-brand-30 active:bg-brand-30"
                >
                  {friend.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
