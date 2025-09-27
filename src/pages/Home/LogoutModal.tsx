import { ConfirmModal } from '@/shared/ui/common/AlertDIalog/confirmModal';
import { AlertDialogAction, AlertDialogCancel } from '@/shared/ui/common/alert-dialog';
import { Button } from '@/shared/ui/common/button';
import { toast } from 'sonner'; // 버튼 test용

export function LogalModal() {
  // TODO: 로그아웃 로직 추가 예정

  return (
    <ConfirmModal>
      <ConfirmModal.Trigger>
        <Button variant="outline">로그아웃 모달 열기</Button>
      </ConfirmModal.Trigger>

      <ConfirmModal.Content>
        <ConfirmModal.Header>
          <ConfirmModal.Title>로그아웃 하시겠어요?</ConfirmModal.Title>
        </ConfirmModal.Header>

        <ConfirmModal.ModalOptionWrapper>
          <AlertDialogCancel className="min-w-[96px] bg-gray-200 text-gray-700 hover:bg-gray-300">
            취소
          </AlertDialogCancel>
          <AlertDialogAction className="min-w-[96px] bg-orange-500 text-white hover:bg-orange-600">
            로그아웃
          </AlertDialogAction>
        </ConfirmModal.ModalOptionWrapper>
      </ConfirmModal.Content>
    </ConfirmModal>
  );
}
