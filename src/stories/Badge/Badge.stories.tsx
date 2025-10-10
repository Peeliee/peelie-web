import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/shared/ui/common/Badge/Badge';

const meta = {
  title: 'Atomic/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
        Badge 컴포넌트입니다.
- **variant**: 색상 계열 지정 (\`primary\`, \`secondary\`, \`red\`, \`gray\`, \`green\`)
- **badgeType**: 스타일 타입 지정 (\`fill\`, \`outline\`, \`ghost\`)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'red', 'gray', 'green'],
      description: '색상 계열 선택',
    },
    badgeType: {
      control: 'select',
      options: ['fill', 'outline', 'ghost'],
      description: '뱃지 스타일 선택',
    },
    children: {
      control: 'text',
      description: '뱃지 안에 표시될 텍스트',
    },
    className: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    badgeType: 'fill',
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Playground: Story = {};
