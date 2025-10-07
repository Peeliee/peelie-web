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
        description: '매우 긴 한줄소개입니다. 이렇게 길게 쓸 수 있는지 테스트해보겠습니다.',
        personality: '신중형',
      },
      {
        id: 2,
        name: '박민수',
        description: '정상적인 길이의 소개입니다.',
        personality: '균형형',
      },
      {
        id: 3,
        name: '이지은이지은이지은이지은이지은',
        description: '또 다른 긴 소개입니다. 이것도 테스트해봅시다.',
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
        description: '한줄소개',
        imageSrc: 'nature.jpeg',
        personality: '신중형',
      },
    ],
  },
};
