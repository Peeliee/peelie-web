import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryCard } from '@/entities/category/ui/CategoryCard';
import MockImg from '@/assets/mockImg.svg?react';

const meta: Meta<typeof CategoryCard> = {
  title: 'Card/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component: `
        카테고리 카드 컴포넌트입니다.
        근데 버튼으로 해도 무방
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

// 기본 카드
export const Default: Story = {
  args: {
    icon: MockImg,
    label: '미디어/콘텐츠',
  },
};
