import type { Meta, StoryObj } from '@storybook/react-vite';
import { Question } from '@/features/onboarding/ui/Question';

const meta: Meta<typeof Question> = {
  title: 'Features/Onboarding/Question',
  component: Question,
  tags: ['autodocs'],
  args: {
    level: 0,
    title: '영화는 어떻게 즐기는 편인가요?',
    options: ['극장 관람 위주', 'TV/VOD 위주', 'OTT 스트리밍 위주', '상황에 따라 다 섞어서'],
  },
};
export default meta;

type Story = StoryObj<typeof Question>;

export const Example: Story = {
  args: {
    title: '영화는 어떻게 즐기는 편인가요?',
    onAnswer: (val: string) => console.log(val),
  },
};
