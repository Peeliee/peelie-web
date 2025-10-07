import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepProgress } from '@/shared/ui/common/Progress/StepProgress';

const meta = {
  title: 'atomic/StepProgress',
  component: StepProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        그라데이션 ProgressBar 컴포넌트입니다.  
        
    - \`currentStep\`: 현재 단계 (1~4)

    색상
    - Step1: \`peelie-primary-900\`
    - Step2: \`peelie-primary-600\`
    - Step3: \`peelie-positive-600\`
    - Step4: \`peelie-secondary-200\`
    `,
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 1, max: 4, step: 1 },
      description: '현재 진행 중인 스텝 번호 (1~4)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    currentStep: 1,
  },
} satisfies Meta<typeof StepProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
  },
};
