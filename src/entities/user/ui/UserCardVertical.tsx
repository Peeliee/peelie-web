import { cn } from '@/shared/lib/utils';

interface UserCardVerticalProps {
  className?: string;
  imageSrc?: string;
  name: string;
  personality: string; // 교류 성향
  discription: string; // 한줄 소개
  onClick?: () => void;
}

/**
 * UserCardVertical
 *
 * 사용자 정보를 세로 레이아웃으로 보여주는 카드
 *
 * @example
 * <UserCardVertical
 *   imageSrc="/김용희.png"
 *   name="김용희"
 *   personality="신중형"
 *   description="대화를 통해 배우고, 나누며 성장하고 싶습니다."
 * />
 */
export const UserCardVertical = ({
  className,
  imageSrc,
  name,
  personality,
  discription,
  onClick,
}: UserCardVerticalProps) => {
  return (
    <div
      onClick={onClick}
      className={cn('flex flex-col w-60 items-center gap-2 rounded-xl border p-4', className)}
    >
      {/* 프로필 이미지 */}
      <div className="w-24 h-24 bg-gray-200">
        {imageSrc && <img src={imageSrc} alt={`${name} 프로필`} className="w-full h-full" />}
      </div>

      {/* 이름, 성향 */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{name}</span>
        {personality && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
            {personality}
          </span>
        )}
      </div>

      {/* 한줄 소개 */}
      <span>한줄소개</span>
      {discription && <div className="text-sm text-gray-500 text-center">{discription}</div>}
    </div>
  );
};
