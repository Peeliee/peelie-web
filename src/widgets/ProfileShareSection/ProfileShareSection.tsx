import { QrModal, ConfirmModal } from '@/shared/ui/common/Modal/QrModal';
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
        <ConfirmModal />
      </div>
    </div>
  );
};
