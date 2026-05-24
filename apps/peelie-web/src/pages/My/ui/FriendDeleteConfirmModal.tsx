import Modal from '@/shared/ui/common/Modal/Modal';

interface FriendDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function FriendDeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: FriendDeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={false}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-body-l-500 text-gray-99">정말 친구를 삭제하시겠어요?</span>
          <span className="text-body-s-400 text-text-sub">진행하시던 채팅을 이어갈 수 없어요</span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 rounded-full bg-gray-20 text-body-m-400 text-gray-70"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 flex-1 rounded-full bg-gray-70 text-body-m-400 text-gray-01"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
