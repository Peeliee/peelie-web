import Modal from '@/shared/ui/common/Modal/Modal';

interface ChatBlockedModalProps {
  isOpen: boolean;
  reason: 'withdrawn' | 'unfriended';
  onClose: () => void;
}

export function ChatBlockedModal({ isOpen, reason, onClose }: ChatBlockedModalProps) {
  const message =
    reason === 'withdrawn'
      ? '탈퇴한 유저의 아바타와는 대화가 불가능해요'
      : '친구 삭제한 유저와는 대화가 불가능해요';

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
      <div className="flex flex-col gap-6">
        <span className="text-body-l-500 text-gray-99">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="h-12 w-full rounded-full bg-gray-70 text-body-m-400 text-gray-01"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
