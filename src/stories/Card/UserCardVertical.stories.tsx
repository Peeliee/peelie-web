import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalUserCard } from '@/shared/ui/common/Card/VerticalUserCard';

const meta: Meta<typeof VerticalUserCard> = {
  title: 'Card/UserCardVertical',
  component: VerticalUserCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VerticalUserCard>;

export const VerticalCard: Story = {
  args: {
    imageSrc: '/김용희.png',
    name: '김용희',
    personality: '외향형',
    description: '함께 성장하며 즐거운 대화를 나누고 싶습니다.',
    onClick: () => alert('클릭'),
  },
};
