import { cn } from '@/shared/lib/utils';
import { DDayBubble } from '@/shared/ui/icons/home-page/DDayBubble';
// import { DownloadIcon } from '@/shared/ui/icons/DownloadIcon';
// import { Button } from '@/shared/ui/common/button';

interface DDayModalProps {
  friendName: string;
  friendPersonality: string;
  personalityColor?: string;
  summaryDescription: string;
  onHome: () => void;
  onSaveImage: () => void;
  className?: string;
}

export function DDayModal({
  friendName,
  friendPersonality,
  personalityColor = '#afe8ff',
  summaryDescription,
  onHome,
  // onSaveImage,
  className,
}: DDayModalProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div
        className={cn(
          'relative flex flex-col items-center overflow-hidden',
          'rounded-large bg-gray-01 p-7 max-w-[323px]',
        )}
      >
        <img
          src="/DDayModalCharacter.png"
          className="h-[100px] w-[139px] shrink-0 object-contain"
        />

        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="rounded-full bg-gray-70 px-2 text-caption-m-400 text-gray-01">
            D-day
          </span>
          <p className="text-body-l-500 text-text-main text-center font-semibold">
            오늘은 <span style={{ color: personalityColor }}>{friendPersonality}</span> {friendName}
            님과의
            <br />
            약속이 있는 날이에요!
          </p>
        </div>

        <div
          className={cn(
            'mt-3 flex flex-col justify-center gap-1.5 py-2 px-4 w-full',
            'rounded-small border border-border bg-gray-10 px-4',
          )}
        >
          <div className="flex items-center gap-1">
            <DDayBubble className="size-[18px]" />
            <span className="text-caption-m-400 text-text-main font-medium">
              {friendName}님과의 가상챗 요약
            </span>
          </div>
          <p className="text-caption-m-400 text-text-main whitespace-pre-line">
            {summaryDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={onHome}
          className={cn(
            'mt-5 flex h-12 w-[267px] items-center justify-center',
            'rounded-full bg-gray-70 text-body-m-400 text-gray-01',
          )}
        >
          홈으로
        </button>
      </div>

      {/* TODO : 이미지저장?? */}
      {/* <button type="button" onClick={onSaveImage} className="text-gray-10 flex items-center gap-2">
        <DownloadIcon className="size-6" />
        <span className="text-body-s-400">이미지로 저장하기</span>
      </button> */}
    </div>
  );
}
