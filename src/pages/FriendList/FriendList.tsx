import {
  UserCardHorizontal,
  UserCardImage,
  UserCardName,
  UserCardPersonality,
  UserCardDescription,
} from '@/entities/user/ui/UserCardHorizontal';

import { GlobalNavigationBar } from '@/app/layout/navigation/ui/GlobalNavigationBar';

import { useNavigate } from 'react-router-dom';

export interface Friend {
  id: number;
  name: string;
  description: string;
  personality: string;
  imageSrc?: string;
}

export interface FriendListProps {
  friends?: Friend[];
  onFriendClick?: (friendId: number) => void;
  onSortClick?: () => void;
}

const defaultFriends: Friend[] = [
  {
    id: 1,
    name: '김나은',
    imageSrc: 'nature.jpeg',
    description: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    personality: '신중형',
  },
  {
    id: 2,
    name: '유지원',
    imageSrc: 'nature.jpeg',
    description: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    personality: '균형형',
  },
  {
    id: 3,
    name: '김용희',
    imageSrc: 'nature.jpeg',
    description: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    personality: '빠른 연결형',
  },
  {
    id: 4,
    name: '신재현',
    imageSrc: 'nature.jpeg',
    description: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    personality: '신중형',
  },
  {
    id: 5,
    name: '강희구',
    imageSrc: 'nature.jpeg',
    description: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    personality: '균형형',
  },
  {
    id: 6,
    name: '권두환',
    imageSrc: 'nature.jpeg',
    description: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    personality: '빠른 연결형',
  },
];

export const FriendList = ({
  friends = defaultFriends,
  onFriendClick,
  onSortClick,
}: FriendListProps) => {
  const navigate = useNavigate();
  const handleFriendClick = (id: number) => {
    if (onFriendClick) {
      onFriendClick(id);
    } else {
      navigate(`/friend/${id}`); // FriendPage로 이동
    }
  };
  //todo: 정렬 기능 추가 후 btn에 추가 (우선수위 늦음)
  const handleSortClick = () => {
    if (onSortClick) {
      onSortClick();
    }
  };

  return (
    <div className="friend-list-page">
      {/* 헤더 */}
      <header className="flex w-full items-center justify-between p-4">
        <h1>친구목록</h1>
        <button className="flex cursor-pointer items-center gap-1" onClick={handleSortClick}>
          최근 교류순
        </button>
      </header>

      {/* 친구 목록 */}
      <div className="p-4 pb-20">
        {friends.map((friend) => (
          <UserCardHorizontal
            key={friend.id}
            onClick={() => handleFriendClick(friend.id)}
            className="flex h-[117px] justify-center items-center gap-[30px] self-stretch rounded-[18px] bg-gray-300 mb-3 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <UserCardImage src={friend.imageSrc} />
            <div className="flex flex-col flex-1">
              <UserCardName>{friend.name}</UserCardName>
              <UserCardDescription>{friend.description}</UserCardDescription>
            </div>
            <UserCardPersonality>{friend.personality}</UserCardPersonality>
          </UserCardHorizontal>
        ))}
      </div>

      <GlobalNavigationBar />
    </div>
  );
};
