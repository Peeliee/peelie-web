import { cn } from '@/shared/lib/utils';

interface VerticalUserCardProps {
  className?: string;
  imageSrc?: string;
  name: string;
  interactionStyle: string; // 교류 성향
  description: string; // 한줄 소개
  onClick?: () => void;
}

/**
 * VerticalUserCard
 *
 * 사용자 정보를 세로 레이아웃으로 보여주는 카드
 *
 * @example
 * <VerticalUserCard
 *   imageSrc="/김용희.png"
 *   name="김용희"
 *   interactionStyle="신중형"
 *   description="대화를 통해 배우고, 나누며 성장하고 싶습니다."
 * />
 */
export const VerticalUserCard = ({
  className,
  imageSrc,
  name,
  interactionStyle,
  description,
  onClick,
}: VerticalUserCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn('flex flex-col w-66 items-center gap-2 rounded-xl border p-4', className)}
    >
      {/* 프로필 이미지 */}
      <div className="w-full h-full bg-gray-200">
        {imageSrc && <img src={imageSrc} alt={`${name} 프로필`} />}
      </div>

      {/* 이름, 성향 */}
      <div className="flex w-full items-center justify-between gap-2 pt-8">
        <span className="font-bold text-lg">{name}</span>
        {interactionStyle && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
            {interactionStyle}
          </span>
        )}
      </div>

      {/* 한줄 소개 */}
      <span className="justify-start w-full pt-5">한줄소개</span>
      {description && <div className="text-sm text-gray-500 text-start">{description}</div>}
    </div>
  );
};
