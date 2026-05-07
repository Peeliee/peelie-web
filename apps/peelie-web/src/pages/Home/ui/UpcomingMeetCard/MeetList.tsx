import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { ChatRoomProfileIcon } from '@/shared/ui/icons/ChatRoomProfileIcon';
import type { Meet } from './types';
import { getDday } from './utils';

const ITEM_HEIGHT = 71;
const MAX_VISIBLE = 4;

interface MeetListProps {
  meets: Meet[];
  isOpen: boolean;
  onItemClick?: (meet: Meet) => void;
}

export function MeetList({ meets, isOpen, onItemClick }: MeetListProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn(
            'relative w-full overflow-hidden bg-gray-01',
            'rounded-bl-medium rounded-br-medium shadow-float',
          )}
        >
          <ul
            className="show-scrollbar overflow-y-auto pt-3"
            style={{ maxHeight: ITEM_HEIGHT * MAX_VISIBLE }}
          >
            {meets.map((meet, idx) => (
              <li
                key={meet.id}
                className={cn(idx !== meets.length - 1 && 'border-b border-gray-30')}
              >
                <button
                  type="button"
                  onClick={() => onItemClick?.(meet)}
                  className={cn(
                    'flex w-full items-center gap-2 px-4 py-3 text-left',
                    'hover:bg-brand-30 active:bg-brand-30',
                  )}
                >
                  <ChatRoomProfileIcon />
                  <div className="flex shrink-0 flex-col">
                    <span className="text-caption-m-400 text-brand-50">{meet.friend.type}</span>
                    <span className="truncate text-body-m-400 font-medium text-gray-99">
                      {meet.friend.name}
                    </span>
                  </div>
                  <p className="ml-2 flex-1 truncate text-body-s-400 text-gray-99">{meet.title}</p>
                  <span className="shrink-0 text-body-m-400 text-gray-99">
                    {getDday(meet.date)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
