import { ConfirmModal } from "@/shared/ui/common/AlertDIalog/confirmModal"
import { AlertDialogAction, AlertDialogCancel } from "@/shared/ui/common/alert-dialog"
import { Button } from "@/shared/ui/common/button"
import { toast } from "sonner" // 버튼 test용

export function LogalModal() {
    // TODO: 로그아웃 로직 추가 예정
  const handleLogout = () => {
    toast.success("로그아웃 실행!"); // ✅ 로그아웃 버튼 테스트용
  };

  const handleCancel = () => {
    toast.message("취소 선택됨"); // ✅ 취소 버튼 테스트용
  };
  
 return (
    <ConfirmModal>
      <ConfirmModal.Trigger>
        <Button variant="outline">로그아웃 모달 열기</Button>
      </ConfirmModal.Trigger>

      <ConfirmModal.Content>
      <ConfirmModal.Header>
          <ConfirmModal.Title>로그아웃 하시겠어요?</ConfirmModal.Title>
        </ConfirmModal.Header>

        <ConfirmModal.Footer>
          <AlertDialogCancel 
            className="min-w-[96px] bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={handleCancel}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction 
            className="min-w-[96px] bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleLogout}
          >
            로그아웃
          </AlertDialogAction>
        </ConfirmModal.Footer>
      </ConfirmModal.Content>
    </ConfirmModal>
 );

}