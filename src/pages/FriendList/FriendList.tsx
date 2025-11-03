import { FlipUserCard } from '@/features/user/FlipUserCard';

import { GlobalNavigationBar } from '@/app/layout/navigation/ui/GlobalNavigationBar';

// import { useNavigate } from 'react-router-dom';

const defaultFriends = [
  {
    userName: '김나은',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userName: '유지원',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userName: '김용희',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userName: '강희구',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
  {
    userName: '유지원',
    profileUrl: 'nature.jpeg',
    stage: 1,
    bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
    interactionStyle: '신중형',
  },
];

export const FriendList = () => {
  // const navigate = useNavigate();

  return (
    <div className="friend-list-page">
      {/* 헤더 */}
      <header className="flex w-full items-center justify-between p-4">
        <h1>친구목록</h1>
      </header>

      {/* 친구 목록 */}
      <div className="p-4 pb-20">
        {defaultFriends.map((friend) => (
          <FlipUserCard friend={friend} />
        ))}
      </div>
      <GlobalNavigationBar />
    </div>
  );
};
