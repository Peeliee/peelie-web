import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import MockImg from '@/assets/mockImg.svg?react';

interface HorizontalUserCardProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * 사용자 정보를 가로 레이아웃으로 보여주는 카드
 *
 * UserCardEditProfile, UserCardInteractionStyle 같은 하위 컴포넌트를 조합해서 사용.
 *
 * @example
 * <HorizontalUserCard onClick={() => console.log('카드 클릭')}>
 *   <UserCardImage src="/avatar.png" />
 *   <div className="flex flex-col">
 *     <UserCardName>김용희</UserCardName>
 *     <UserCardDescription>대화를 통해 배우고, 성장하고 싶습니다.</UserCardDescription>
 *   </div>
 *   <UserCardInteractionStyle>신중형</UserCardInteractionStyle>
 * </HorizontalUserCard>
 *
 */
const HorizontalUserCard = ({ className, children, onClick }: HorizontalUserCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex h-60 items-center gap-4 rounded-lg border p-4 bg-white shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
};

const UserCardImage = ({ src, className }: { src?: string; className?: string }) => {
  return (
    <div className={cn('w-34 h-34 bg-gray-200 overflow-hidden', className)}>
      {src && <img src={src} />}
    </div>
  );
};

// 이름
const UserCardName = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('font-bold', className)}>{children}</div>;
};

// 한줄소개
const UserCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('text-sm text-gray-500', className)}>
      한줄소개 <br />
      {children}
    </div>
  );
};

// 프로필 수정
const UserCardEditProfile = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={cn('ml-auto text-xs border-2 p-2 rounded-2xl', className)}>
      {children}
    </button>
  );
};

// 교류 성향 배지
const UserCardInteractionStyle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'px-2 py-0.5 ml-auto text-xs rounded-full bg-gray-200 text-gray-700 whitespace-nowrap',
        className,
      )}
    >
      {children}
    </div>
  );
};

const UserCardFlipped = ({
  userName,
  stage,
  onClick,
}: {
  userName: string;
  stage: number;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        'w-full h-60 rounded-2xl bg-gradient-to-br from-[#FFAD33] to-[#FF823D]',
        'p-6 flex flex-col items-center justify-center text-center text-white aspect-[4/3]',
      )}
    >
      <MockImg className="w-20" />
      {userName}님과 나의 교류껍질은 아직 단단해요! <br /> 한 겹 더 친해질 시간이에요 {stage}
      <div className="w-full border-t border-white/30 mb-3" />
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-center gap-1 text-sm font-medium',
          'text-white hover:text-white/90 transition',
        )}
      >
        친구 프로필 바로가기
      </button>
    </div>
  );
};

export {
  HorizontalUserCard,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardEditProfile,
  UserCardInteractionStyle,
  UserCardFlipped,
};
