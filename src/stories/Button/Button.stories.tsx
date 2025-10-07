import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/shared/ui/common/button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        버튼 컴포넌트입니다.
        variant : primary, inactive, secondary, error
        buttonType : fill, outline, ghost
        state : default, pressed, disabled
        size : small, medium, large, extraLarge
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'inactive', 'secondary', 'error'],
      description: '색상 계열 선택',
    },
    buttonType: {
      control: 'select',
      options: ['fill', 'outline', 'ghost'],
      description: '버튼 스타일 (채움, 아웃라인, 고스트)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
    // onClick: { action: 'clicked' },
    asChild: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    buttonType: 'fill',
    size: 'medium',
    disabled: false,
    children: '텍스트',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Playground: Story = {};
