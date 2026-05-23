import Modal from '@/shared/ui/common/Modal/Modal';
import { XIcon } from '@/shared/ui/icons/XIcon';

interface FriendDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChatClick: () => void;
  png: string;
  personalityLabel: string;
  name: string;
  ddayLabel: string;
}

export function FriendDetailModal({
  isOpen,
  onClose,
  onChatClick,
  png,
  personalityLabel,
  name,
  ddayLabel,
}: FriendDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[323px] bg-transparent p-0">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-[390px] w-full flex-col items-center overflow-hidden rounded-large bg-gray-01 p-7">
          <img src={png} aria-hidden className="size-[140px] select-none opacity-50" />

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center whitespace-nowrap rounded-full bg-gray-70 px-2 shadow-float">
              <span className="text-caption-m-400 text-gray-01">{ddayLabel}</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <p className="text-body-l-500">
                <span className="text-brand-50">{personalityLabel}</span>{' '}
                <span className="text-text-main">{name}님과</span>
              </p>
              <p className="text-body-l-500 text-text-main">지금 바로 대화하러 가볼까요?</p>
              <p className="mt-1 text-body-s-400 text-text-sub">
                이전에 대화를 나눈 기록이 있어요.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onChatClick}
            className="mt-auto flex h-12 w-full items-center justify-center rounded-full bg-gray-70"
          >
            <span className="text-body-m-400 text-gray-01">대화하러 가기</span>
          </button>
        </div>

        <button type="button" onClick={onClose} aria-label="닫기">
          <XIcon />
        </button>
      </div>
    </Modal>
  );
}
