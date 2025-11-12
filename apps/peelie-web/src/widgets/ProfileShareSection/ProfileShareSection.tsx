import { QrModal } from '@/shared/ui/common/Modal/ModalPresets';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';

interface ProfileShareSectionProps {
  className?: string;
}

export const ProfileShareSection = ({ className }: ProfileShareSectionProps) => {
  return (
    <div
      className={cn('w-full p-4 bg-peelie-primary-100 shadow-elevation-3 rounded-400', className)}
    >
      <h2 className="heading-4-medium text-peelie-gray-900 mb-4">프로필 공유하기</h2>
      <div className="flex flex-row gap-4">
        <QrModal url="https://naver.com" className="flex-1">
          내 QR 공유하기
        </QrModal>
        <Button variant={'secondary'} state={'default'} size={'medium'} className="flex-1">
          친구 QR 공유받기
        </Button>
      </div>
    </div>
  );
};
