import { QrModal } from '@/features/user/ui/QrModal';

interface ProfileShareSectionProps {
  onShareClick?: () => void;
}

export const ProfileShareSection = ({ onShareClick }: ProfileShareSectionProps) => {
  return (
    <div className="w-full border-b border-gray-200">
      <h2 className="px-4 py-3 font-semibold text-black">프로필 공유하기</h2>
      <div className="px-4 pb-4">
        <QrModal
          url="naver.com"
          triggerLabel="나의 QR 공유하기"
          title="QR을 스캔해주세요"
          description="교류하고자 하는 친구에게 나의 QR을 보여주세요"
          tagText="적극적인 교류자"
          userName="유지원"
        />
      </div>
    </div>
  );
};
