import type { Meta, StoryObj } from '@storybook/react-vite';
import { FriendList } from '@/pages/FriendList/FriendList';

const meta: Meta<typeof FriendList> = {
  title: 'Pages/FriendList',
  component: FriendList,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onFriendClick: (friendId: number) => alert(`친구 ${friendId} 클릭됨`),
    onSortClick: () => alert('정렬 버튼 클릭됨'),
  },
};

export default meta;
type Story = StoryObj<typeof FriendList>;

// 기본 스토리 (mockUsers 기준)
export const Default: Story = {
  args: {
    friends: [
      {
        id: 1,
        name: '김나은',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '신중형',
      },
      {
        id: 2,
        name: '유지원',
        tagline: '한줄소개',
        bio: '나누며 성장하고 싶습니다,\n대화를 통해 배우고.',
        personality: '균형형',
      },
      {
        id: 3,
        name: '김용희',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '빠른 연결형',
      },
    ],
  },
};

// 빈 친구 목록
export const EmptyList: Story = {
  args: {
    friends: [],
  },
};

// 친구가 많은 경우 (mockUsers 전체)
export const ManyFriends: Story = {
  args: {
    friends: [
      {
        id: 1,
        name: '김나은',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '신중형',
      },
      {
        id: 2,
        name: '유지원',
        tagline: '한줄소개',
        bio: '나누며 성장하고 싶습니다,\n대화를 통해 배우고.',
        personality: '균형형',
      },
      {
        id: 3,
        name: '김용희',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '빠른 연결형',
      },
      {
        id: 4,
        name: '신재현',
        tagline: '한줄소개',
        bio: '나누며 성장하고 싶습니다,\n대화를 통해 배우고.',
        personality: '신중형',
      },
      {
        id: 5,
        name: '강희구',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '균형형',
      },
      {
        id: 6,
        name: '권두환',
        tagline: '한줄소개',
        bio: '나누며 성장하고 싶습니다,\n대화를 통해 배우고.',
        personality: '빠른 연결형',
      },
      {
        id: 7,
        name: '성하빈',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '신중형',
      },
    ],
  },
};

// 긴 텍스트 테스트 (UI 깨짐 방지용 - 필수)
export const LongContent: Story = {
  args: {
    friends: [
      {
        id: 1,
        name: '김용희김용희김용희김용희',
        tagline: '매우 긴 한줄소개입니다. 이렇게 길게 쓸 수 있는지 테스트해보겠습니다.',
        bio: '매우 긴 자기소개입니다.\n여러 줄에 걸쳐서 작성된 내용이에요.\n이렇게 긴 내용이 잘 표시되는지 확인해보겠습니다.\n줄바꿈도 제대로 처리되는지 테스트하고 있습니다.\n추가로 더 긴 내용을 넣어서 테스트해보겠습니다.',
        personality: '신중형',
      },
      {
        id: 2,
        name: '박민수',
        tagline: '정상 길이',
        bio: '정상적인 길이의 소개입니다.',
        personality: '균형형',
      },
      {
        id: 3,
        name: '이지은이지은이지은이지은이지은',
        tagline: '또 다른 긴 소개입니다. 이것도 테스트해봅시다.',
        bio: '짧은 bio',
        personality: '빠른 연결형',
      },
    ],
  },
};

// 단일 친구
export const SingleFriend: Story = {
  args: {
    friends: [
      {
        id: 1,
        name: '김용희',
        tagline: '한줄소개',
        bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
        personality: '신중형',
      },
    ],
  },
};
