import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserCardVertical } from '@/entities/user/ui/UserCardVertical';

const meta: Meta<typeof UserCardVertical> = {
  title: 'Card/UserCardVertical',
  component: UserCardVertical,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserCardVertical>;

export const VerticalCard: Story = {
  args: {
    imageSrc: '/김용희.png',
    name: '김용희',
    personality: '외향형',
    description: '함께 성장하며 즐거운 대화를 나누고 싶습니다.',
    onClick: () => alert('클릭'), 
  },
};
