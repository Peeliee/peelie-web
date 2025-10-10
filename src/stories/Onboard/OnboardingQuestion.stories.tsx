import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  OnboardingTextQuestion,
  OnboardingChoiceQuestion,
} from '@/features/onboarding/ui/OnboardingQuestion';

const meta: Meta<typeof OnboardingChoiceQuestion> = {
  title: 'Question/Question',
  component: OnboardingChoiceQuestion,
  tags: ['autodocs'],
  args: {
    level: 'L0',
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

type Story = StoryObj<typeof OnboardingChoiceQuestion>;

export const ObjectQuestion: Story = {
  args: {
    title: '영화는 어떻게 즐기는 편인가요?',
    onAnswer: (val: string) => console.log(val),
  },
};

export const SubjectQuestion: StoryObj<typeof OnboardingTextQuestion> = {
  render: (args) => <OnboardingTextQuestion {...args} />,
  args: {
    level: 'L1',
    title: '좋아하는 영화를 한 줄로 적어주세요',
    placeholder: '예) F1',
    onAnswer: (val: string) => console.log('답변:', val),
  },
};
