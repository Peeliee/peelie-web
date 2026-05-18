import { useGetMeQuery } from '@/entities/auth';
import { ModalCharacterIcon } from '@/shared/ui/icons/ModalCharacterIcon';
import { ShareCodeIcon } from '@/shared/ui/icons/ShareCodeIcon';
import { cn } from '@/shared/lib/utils';

interface ShareCodePanelProps {
  onShare: () => void;
}

export function ShareCodePanel({ onShare }: ShareCodePanelProps) {
  const { data: me } = useGetMeQuery();
  return (
    <div className={cn('relative h-[400px] w-full overflow-hidden rounded-large', 'bg-gray-01')}>
      {/* 상단: 캐릭터 + 안내 문구 */}
      <div
        className={cn(
          'absolute left-1/2 top-[29px] flex -translate-x-1/2',
          'flex-col items-center gap-4',
        )}
      >
        <ModalCharacterIcon />
        <p className="text-body-l-500 font-medium whitespace-nowrap text-gray-99">
          내 코드를 공유해 친구를 추가해보세요!
        </p>
      </div>

      {/* 내 코드 */}
      <p
        className={cn(
          'absolute left-1/2 top-[138px] -translate-x-1/2 whitespace-nowrap',
          'text-title-l-600 text-gray-99',
        )}
      >
        {me?.friendCode}
      </p>

      {/* 캐릭터 + 말풍선 (이미지) */}
      <img
        src="/share-my-code.png"
        alt="내 코드 공유 이미지"
        className={cn(
          'absolute left-1/2 top-[202px] h-[110px] w-[235px]',
          '-translate-x-1/2 object-contain',
        )}
      />

      {/* 공유 버튼 */}
      <div className="absolute left-1/2 top-[324px] -translate-x-1/2">
        <button
          type="button"
          onClick={onShare}
          className={cn(
            'flex h-12 w-[264px] items-center justify-center',
            'gap-2 rounded-full bg-gray-70 text-body-m-400 text-gray-01',
          )}
        >
          <ShareCodeIcon className="h-6 w-6" />
          코드 공유하기
        </button>
      </div>
    </div>
  );
}
