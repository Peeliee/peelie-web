import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { ChevronDownIcon } from '@/shared/ui/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/shared/ui/icons/ChevronUpIcon';

export type SortOrder = '최신순' | '오래된 순';

const SORT_OPTIONS: SortOrder[] = ['최신순', '오래된 순'];

interface SortDropdownProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleSelect = (option: SortOrder) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-caption-m-400 text-gray-50">{value}</span>
        {isOpen ? (
          <ChevronUpIcon className="size-6 text-gray-50" />
        ) : (
          <ChevronDownIcon className="size-6 text-gray-50" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn(
              'absolute right-0 top-full z-10',
              'mt-1 overflow-hidden rounded-small',
              'border border-border-main bg-gray-01 shadow-card-02',
            )}
          >
            {SORT_OPTIONS.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'flex h-10 w-full items-center whitespace-nowrap px-4 text-caption-m-400',
                    value === option ? 'text-brand-main' : 'text-text-main',
                    'hover:bg-brand-30 active:bg-brand-30',
                  )}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
