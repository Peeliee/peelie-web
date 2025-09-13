import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingQuestionForm } from '@/widgets/OnboardingQuestionForm/OnboardingQuestionForm';

const meta: Meta<typeof OnboardingQuestionForm> = {
  title: 'Features/Onboarding/OnboardingQuestionForm',
  component: OnboardingQuestionForm,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof OnboardingQuestionForm>;

export const Default: Story = {
  render: () => <OnboardingQuestionForm />,
};
