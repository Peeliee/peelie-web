import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from '@/shared/ui/common/TextInput/TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'atomic/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        TextInput 컴포넌트입니다.

        label: 상단 라벨 텍스트
        placeholder: 입력 안내 문구

        --- optional --- 
        error, errorText: 에러 상태 및 메시지 표시
        disabled: 입력 비활성화

        ----------------
        entered 와 focus 의 구분이 모호해 그냥 focus 되었을 때 entered 의 텍스트 컬러를 적용함

        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '입력창 상단에 표시할 라벨',
    },
    placeholder: {
      control: 'text',
      description: '입력창 placeholder 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    errorText: {
      control: 'text',
      description: '에러일 때 하단에 표시할 에러 메시지',
      if: { arg: 'error', truthy: true },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
    error: false,
    errorText: '',
    disabled: false,
  },
};

export const Error: Story = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
    error: true,
    errorText: 'error text',
  },
};

export const Disabled: Story = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
    disabled: true,
  },
};
