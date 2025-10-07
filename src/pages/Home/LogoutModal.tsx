import { ConfirmModal } from '@/shared/ui/common/AlertDIalog/confirmModal';
import { Button } from '@/shared/ui/common/button';

export function LogalModal() {
  // TODO: 로그아웃 로직 추가 예정

  return (
    <ConfirmModal>
      <ConfirmModal.Trigger>
        <Button variant="primary">로그아웃 모달 열기</Button>
      </ConfirmModal.Trigger>

      <ConfirmModal.Content>
        <ConfirmModal.Header>
          <ConfirmModal.Title>로그아웃 하시겠어요?</ConfirmModal.Title>
        </ConfirmModal.Header>
      </ConfirmModal.Content>
    </ConfirmModal>
  );
}
