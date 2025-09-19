import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';

const meta: Meta<typeof OnboardingQuestionForm> = {
  title: 'Onboarding/OnboardingQuestionForm',
  component: OnboardingQuestionForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        카테고리별 질문 폼입니다.
        질문에 대한 답변 시 아코디언 느낌으로 펼쳐집니다.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof OnboardingQuestionForm>;

export const Default: Story = {
  render: () => <OnboardingQuestionForm />,
};
