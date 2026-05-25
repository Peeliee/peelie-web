import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/utils';
import useScrollLock from '../Modal/useScrollLock';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function BottomSheet({ isOpen, onClose, children, className }: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setVisible(false);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !visible) setMounted(false);
  };

  if (!mounted) return null;

  const root = document.getElementById('modal-root');
  if (!root) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col justify-end',
        'transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={cn(
          'relative w-full rounded-tl-large rounded-tr-large bg-gray-01',
          'transition-transform duration-300',
          visible ? 'translate-y-0' : 'translate-y-full',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3">
          <div className="h-[5px] w-16 rounded-full bg-gray-30" />
        </div>
        {children}
      </div>
    </div>,
    root,
  );
}
