import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  UserCardHorizontal,
  UserCardImage,
  UserCardName,
  UserCardDescription,
  UserCardEditProfile,
  UserCardPersonality,
} from '@/entities/user/ui/UserCardHorizontal';

const meta: Meta<typeof UserCardHorizontal> = {
  title: 'Card/UserHorizontalCard',
  component: UserCardHorizontal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        유저 카드 컴포넌트입니다.
       ProfileCard : 내 프로필에서 사용합니다.
       PersonalityCard : 친구 목록에서 사용합니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserCardHorizontal>;

// 프로필 버전
export const ProfileCard: Story = {
  render: () => (
    <UserCardHorizontal>
      <UserCardImage />
      <div className="flex flex-col">
        <UserCardName>김용희</UserCardName>
        <UserCardDescription>대화를 통해 배우고, 나누며 성장하고 싶습니다.</UserCardDescription>
      </div>
      <UserCardEditProfile onClick={() => alert('수정 클릭')}>프로필 수정하기</UserCardEditProfile>
    </UserCardHorizontal>
  ),
};

// 교류 성향 버전
export const PersonalityCard: Story = {
  render: () => (
    <UserCardHorizontal onClick={() => alert('클릭')}>
      <UserCardImage />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <UserCardName>김용희</UserCardName>
        </div>
        <UserCardDescription>대화를 통해 배우고, 나누며 성장하고 싶습니다.</UserCardDescription>
      </div>
      <UserCardPersonality>신중형</UserCardPersonality>
    </UserCardHorizontal>
  ),
};
