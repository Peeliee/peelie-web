import { ConfirmModal } from "@/shared/ui/common/AlertDIalog/confirmModal"
import { Button } from "@/shared/ui/common/button"
import { toast } from "sonner"

export function LogalModal() {
    //로그아웃 로직

 return (
    <ConfirmModal>
      <ConfirmModal.Trigger>
        <Button variant="outline">로그아웃 모달 열기</Button>
      </ConfirmModal.Trigger>

      <ConfirmModal.Content>
      <ConfirmModal.Header>
          <ConfirmModal.Title>로그아웃 하시겠어요?</ConfirmModal.Title>
        </ConfirmModal.Header>

        {/* ✅ 같은 Footer/Cancel, 텍스트만 교체 */}
        <ConfirmModal.Footer>
          <ConfirmModal.Cancel>취소</ConfirmModal.Cancel>
          <ConfirmModal.Confirm
            className="min-w-[96px] bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => toast.message("로그아웃 처리")}
          >
            로그아웃
          </ConfirmModal.Confirm>
        </ConfirmModal.Footer>
      </ConfirmModal.Content>
    </ConfirmModal>
 );

}