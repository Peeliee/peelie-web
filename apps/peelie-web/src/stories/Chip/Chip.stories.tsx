import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from '@/shared/ui/common/Chip/Chip';
import PlusIcon from '@/assets/examplePlusIcon.svg?react';

const meta = {
  title: 'Atomic/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        Chip 컴포넌트입니다.
- **variant**: 색상 계열 지정 (\`primary\`, \`secondary\`, \`red\`)
- **chipType**: 스타일 타입 지정 (\`default\`, \`outline\`, \`subtle\`)
- **size**: 크기 지정 (\`small\`, \`medium\`, \`large\`)
- **leftIcon / rightIcon**: 양쪽 아이콘 표시 여부 (선택적)

아이콘이 필요할 경우 \`leftIcon\`, \`rightIcon\`을 true로 설정하면 표시됩니다.
        `,
      },
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'red'],
      description: '색상 계열 선택',
    },
    chipType: {
      control: 'select',
      options: ['default', 'outline', 'subtle'],
      description: '칩 스타일 선택',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '칩 크기 선택',
    },
    leftIcon: {
      control: 'boolean',
      description: '왼쪽 아이콘 표시 여부',
    },
    rightIcon: {
      control: 'boolean',
      description: '오른쪽 아이콘 표시 여부',
    },
    children: {
      control: 'text',
      description: '칩 안의 텍스트',
    },
  },
  args: {
    variant: 'primary',
    chipType: 'default',
    size: 'medium',
    leftIcon: false,
    rightIcon: false,
    children: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const { leftIcon, rightIcon, ...rest } = args;
    return (
      <Chip
        {...rest}
        leftIcon={leftIcon ? <PlusIcon /> : undefined}
        rightIcon={rightIcon ? <PlusIcon /> : undefined}
      />
    );
  },
};
