import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingQuestion } from '@/features/onboarding/ui/OnboardingQuestion';

const meta: Meta<typeof OnboardingQuestion> = {
  title: 'Onboarding/Question',
  component: OnboardingQuestion,
  tags: ['autodocs'],
  args: {
    level: 0,
    title: '영화는 어떻게 즐기는 편인가요?',
    options: ['극장 관람 위주', 'TV/VOD 위주', 'OTT 스트리밍 위주', '상황에 따라 다 섞어서'],
  },
  parameters: {
    docs: {
      description: {
        component: `
        질문 폼의 개별 질문 컴포넌트
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof OnboardingQuestion>;

export const Question: Story = {
  args: {
    title: '영화는 어떻게 즐기는 편인가요?',
    onAnswer: (val: string) => console.log(val),
  },
};
