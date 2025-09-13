import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface UserCardHorizontalProps {
  className?: string;
  children: ReactNode;
  onClick: () => void;
}

/**
 * 사용자 정보를 가로 레이아웃으로 보여주는 카드
 * 
 * UserCardEditProfile, UserCardPersonality 같은 하위 컴포넌트를 조합해서 사용.
 *
 * @example
 * <UserCardHorizontal onClick={() => console.log('카드 클릭')}>
 *   <UserCardImage src="/avatar.png" />
 *   <div className="flex flex-col">
 *     <UserCardName>김용희</UserCardName>
 *     <UserCardDescription>대화를 통해 배우고, 성장하고 싶습니다.</UserCardDescription>
 *   </div>
 *   <UserCardPersonality>신중형</UserCardPersonality>
 * </UserCardHorizontal>
 *
 */
const UserCardHorizontal = ({ className, children, onClick }: UserCardHorizontalProps) => {
  return (
    <div
      onClick={onClick}
      className={cn('flex items-center gap-4 rounded-lg border p-4 bg-white shadow-sm', className)}
    >
      {children}
    </div>
  );
};

const UserCardImage = ({ src }: { src?: string }) => {
  return <div className="w-12 h-12 bg-gray-200 overflow-hidden">{src && <img src={src} />}</div>;
};

// 이름
const UserCardName = ({ children }: { children: ReactNode }) => {
  return <div className="font-bold">{children}</div>;
};

// 한줄소개
const UserCardDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-sm text-gray-500">
      한줄소개 <br />
      {children}
    </div>
  );
};

// 프로필 수정
const UserCardEditProfile = ({ children }: { children: React.ReactNode }) => {
  return <div className="ml-auto">{children}</div>;
};

// 교류 성향
const UserCardPersonality = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-0.5 ml-auto text-xs rounded-full bg-gray-200 text-gray-700">
      {children}
    </div>
  );
};

export {
  UserCardHorizontal,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardEditProfile,
  UserCardPersonality,
};
