import { ModalCharacterIcon } from '@/shared/ui/icons/ModalCharacterIcon';
import { cn } from '@/shared/lib/utils';

interface CompletePanelProps {
  friendName: string;
  onHome: () => void;
}

export function CompletePanel({ friendName, onHome }: CompletePanelProps) {
  return (
    <div className={cn('relative h-[400px] w-full overflow-hidden rounded-large', 'bg-gray-01')}>
      {/* 상단: 캐릭터 + 안내 */}
      <div
        className={cn(
          'absolute left-1/2 top-[28px] flex -translate-x-1/2',
          'flex-col items-center gap-3',
        )}
      >
        <ModalCharacterIcon />
        <div
          className={cn(
            'flex flex-col items-center text-center whitespace-nowrap',
            'text-body-2 font-medium text-gray-99',
          )}
        >
          <p>이제 {friendName}님과 POKI에서</p>
          <p>대화를 시작할 수 있어요!</p>
        </div>
      </div>

      {/* 캐릭터 + 말풍선 (이미지) */}
      <img
        src="/add-friend-finish.png"
        alt=""
        className={cn(
          'absolute left-1/2 top-[151px] h-[145px] w-[210px]',
          '-translate-x-1/2 object-contain',
        )}
      />

      {/* 홈으로 버튼 */}
      <button
        type="button"
        onClick={onHome}
        className={cn(
          'absolute left-[28px] top-[324px] flex h-12',
          'w-[264px] items-center justify-center rounded-full bg-gray-70',
          'text-body-2 text-gray-01',
        )}
      >
        홈으로
      </button>
    </div>
  );
}
