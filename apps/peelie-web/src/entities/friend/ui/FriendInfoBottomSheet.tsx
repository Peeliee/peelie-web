import { useEffect } from 'react';

import { ModalWrapper } from '@/shared/ui/common/Modal/ModalWrapper';
import { splitSentences } from '@/shared/lib/splitSentences';

interface FriendInfoBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: number;
  title: string;
  subTitle: string;
  content: string;
}

export const FriendInfoBottomSheet = ({
  open,
  onOpenChange,
  level,
  title,
  subTitle,
  content,
}: FriendInfoBottomSheetProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* --- Dimmed Background --- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => onOpenChange(false)}></div>
      )}

      {/* --- Bottom Sheet --- */}
      <div
        className={`
          fixed left-0 right-0 bottom-0 z-50 
          bg-peelie-white rounded-t-400 px-4
          transform transition-transform duration-300
          ${open ? 'translate-y-0' : 'translate-y-full'}
          h-[50vh] flex flex-col
        `}
      >
        {/* 헤더 */}
        <div className="flex flex-row h-11.5 items-center justify-center">
          <span className="heading-4-medium whitespace-pre-line w-full">Lv {level} 교류 정보</span>
          <ModalWrapper.CloseButton onClose={() => onOpenChange(false)} />
        </div>

        {/* 내용 */}
        <div className="pb-6 overflow-y-auto flex-1 pr-1">
          <p className="heading-3-medium text-peelie-black mb-6">{title}</p>

          <p className="heading-4-medium text-peelie-gray-800 whitespace-pre-line mb-6">
            {subTitle}
          </p>

          <p className="body-1-regular text-peelie-black whitespace-pre-line">
            {splitSentences(content)}
          </p>
        </div>
      </div>
    </>
  );
};
