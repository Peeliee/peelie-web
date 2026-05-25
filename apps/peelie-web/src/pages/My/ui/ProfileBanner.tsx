import { StraightForwardCharacterIcon } from '@/shared/ui/icons/character/StraightForwardCharacterIcon';
import { PenIcon } from '@/shared/ui/icons/PenIcon';

export function ProfileBanner() {
  return (
    <div className="relative w-full h-[156px] rounded-medium overflow-hidden bg-gradient-to-b from-brand-50 to-brand-30">
      {/* 좌측: 성향 텍스트 */}
      <div className="absolute left-[22px] top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <span className="text-caption-m-400 text-text-sub">나은님의 교류성향은</span>
        <div className="flex items-end gap-0.5">
          <div>
            <p className="text-body-l-500 font-semibold text-gray-99 leading-6">망설임 없이 바로</p>
            <p className="text-body-l-500 font-semibold text-gray-99 leading-6">직진 본능파</p>
          </div>
          <span className="text-caption-m-400 text-text-sub pb-[3px]">입니다</span>
        </div>
      </div>

      {/* 우측: 캐릭터 + 툴팁 + 편집 버튼 */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center w-[112px]">
        <div className="z-[2] mb-[-8px]">
          <div className="bg-gray-70 rounded-xsmall px-2 py-1.5">
            <span className="text-caption-m-400 text-gray-01 whitespace-nowrap">
              나는 직진 본능파
            </span>
          </div>
          <div className="flex justify-center">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-70" />
          </div>
        </div>

        <div className="relative z-1 flex items-end">
          <div className="relative size-[100px] rounded-full bg-gray-01 shadow-profile overflow-hidden shrink-0 mr-[-20px]">
            <StraightForwardCharacterIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55px]" />
          </div>
          <button
            type="button"
            className="relative shrink-0 bg-brand-50 border border-brand-100 rounded-full p-2"
          >
            <PenIcon className="size-4 text-gray-79" />
          </button>
        </div>
      </div>
    </div>
  );
}
