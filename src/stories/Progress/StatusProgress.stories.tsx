import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusProgress } from '@/shared/ui/common/Progress/StatusProgress';

const meta: Meta<typeof StatusProgress> = {
  title: 'atomic/StatusProgress',
  component: StatusProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### StatusProgress

다단계 상태 표시용 Progress Bar 컴포넌트입니다.  
4개의 구간으로 구성되어 있으며, \`currentStep\`에 따라 색상이 순차적으로 활성화됩니다.

- **Props**
  - \`currentStep\`: 현재 진행된 단계 (1~4)
- **색상**
  - Step1: \`peelie-primary-300\`
  - Step2: \`peelie-primary-400\`
  - Step3: \`peelie-primary-500\`
  - Step4: \`peelie-primary-600\`
        `,
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 1, max: 4, step: 1 },
      description: '현재 진행된 단계 (1~4)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    currentStep: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 1,
  },
};
