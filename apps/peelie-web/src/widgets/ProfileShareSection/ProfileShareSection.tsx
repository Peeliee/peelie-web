import { QrModal } from '@/shared/ui/common/Modal/ModalPresets';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface ProfileShareSectionProps {
  className?: string;
}

export const ProfileShareSection = ({ className }: ProfileShareSectionProps) => {
  const handleOpenCamera = () => {
    const isWebView = typeof window.ReactNativeWebView !== 'undefined';

    if (!isWebView) {
      alert('앱에서만 사용할 수 있어요.');
      return;
    }

    window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'OPEN_CAMERA' }));
  };

  return (
    <div
      className={cn('w-full p-4 bg-peelie-primary-100 shadow-elevation-3 rounded-400', className)}
    >
      <h2 className="heading-4-medium text-peelie-gray-900 mb-4">프로필 공유하기</h2>
      <div className="flex flex-row gap-4">
        {/* TODO : 친구추가 기능 연동 */}
        <QrModal url="https://naver.com" className="flex-1">
          내 QR 공유하기
        </QrModal>
        <Button
          variant={'secondary'}
          state={'default'}
          size={'medium'}
          className="flex-1"
          onClick={handleOpenCamera}
        >
          친구 QR 공유받기
        </Button>
      </div>
    </div>
  );
};
