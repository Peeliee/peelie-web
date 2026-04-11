import { type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/utils';
import useScrollLock from './useScrollLock';
import useFocusTrap from './useFocusTrap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useFocusTrap(containerRef, isOpen);

  // mount → visible (진입 애니메이션)
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // visible false → unmount (퇴장 애니메이션 완료 후)
  const handleTransitionEnd = () => {
    if (!visible) {
      setMounted(false);
    }
  };

  // Escape 키 닫기
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      onTransitionEnd={handleTransitionEnd}
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Container */}
      <div
        ref={containerRef}
        className={cn(
          'relative w-[350px] rounded-large bg-gray-01 p-6 transition-transform duration-300',
          visible ? 'scale-100' : 'scale-95',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
