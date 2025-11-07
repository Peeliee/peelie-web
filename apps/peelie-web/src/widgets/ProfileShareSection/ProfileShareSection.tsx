import { QrModal, ConfirmModal } from '@/shared/ui/common/Modal/ModalPresets';
import { cn } from '@/shared/lib/utils';

interface ProfileShareSectionProps {
  className?: string;
}

export const ProfileShareSection = ({ className }: ProfileShareSectionProps) => {
  return (
    <div className={cn('w-full border-b border-gray-200', className)}>
      <h2 className="px-4 py-3 font-semibold text-black">프로필 공유하기</h2>
      <div className="px-4 pb-4">
        <QrModal url="https://naver.com" label="적극적인 교류자" nickName="유지원" />
        <ConfirmModal
          trigger="회원 탈퇴"
          title="정말 탈퇴하시겠어요?"
          description="탈퇴 시 모든 데이터가 삭제됩니다."
          firstButton={{
            text: '취소',
            variant: 'inactive',
            onClick: () => console.log('취소 누름'),
          }}
          secondButton={{
            text: '탈퇴하기',
            variant: 'primary',
            onClick: () => console.log('탈퇴 처리 로직 실행'),
          }}
        />
      </div>
    </div>
  );
};
