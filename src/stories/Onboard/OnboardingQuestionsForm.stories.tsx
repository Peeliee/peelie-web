import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingQuestionForm } from '@/features/onboarding/ui/CategoryQuestionForm';

const meta: Meta<typeof OnboardingQuestionForm> = {
  title: 'Question/OnboardingQuestionForm',
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

const mockMainQuestion = {
  categoryId: 1,
  categoryName: '예시 카테고리',
  categoryQuestion: '이것은 메인 질문입니다.',
  subCategoryNames: [
    { id: 1, name: '서브카테고리1' },
    { id: 2, name: '서브카테고리2' },
  ],
};

export const Default: Story = {
  render: () => <OnboardingQuestionForm mainQuestion={mockMainQuestion} />,
};
