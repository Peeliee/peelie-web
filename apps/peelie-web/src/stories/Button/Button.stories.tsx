import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/shared/ui/common/button';

const meta = {
  title: 'Atomic/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
btn/primary 컴포넌트 (Figma node-id=4233-19570)

- **variant**: 스타일 (\`default\`=filled, \`line\`=outlined)
- **size**: 높이 (\`xs\`=h24, \`sm\`=h32, \`md\`=h48, \`lg\`=h56)
- **radius**: 라운딩 (\`none\`=r0, \`sm\`=r8, \`md\`=r16, \`full\`=r100)
- **iconLeft / iconRight**: 아이콘 슬롯
- **disabled**: 비활성화
- pressed 상태는 CSS \`:active\`로 자동 처리
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'line'],
      description: 'Figma style (default=filled, line=outlined)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Figma height (xs=h24, sm=h32, md=h48, lg=h56)',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'full'],
      description: 'Figma radius (none=r0, sm=r8, md=r16, full=r100)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    radius: 'sm',
    disabled: false,
    children: '버튼 레이블',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 전체 props 컨트롤 가능한 기본 스토리 */
export const Playground: Story = {};

/** default(filled) / line(outlined) 비교 — default, disabled 상태 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="default">Default</Button>
        <Button variant="default" disabled>Default Disabled</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="line">Line</Button>
        <Button variant="line" disabled>Line Disabled</Button>
      </div>
    </div>
  ),
};

/** xs / sm / md / lg 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button size="xs">XS (h24)</Button>
      <Button size="sm">SM (h32)</Button>
      <Button size="md">MD (h48)</Button>
      <Button size="lg">LG (h56)</Button>
    </div>
  ),
};

/** none / sm / md / full radius 비교 */
export const Radiuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button radius="none">None (r0)</Button>
      <Button radius="sm">SM (r8)</Button>
      <Button radius="md">MD (r16)</Button>
      <Button radius="full">Full (r100)</Button>
    </div>
  ),
};

/** iconLeft, iconRight, 양쪽 아이콘 조합 */
export const WithIcons: Story = {
  render: () => {
    const icon = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
    );
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button iconLeft={icon}>Icon Left</Button>
          <Button iconRight={icon}>Icon Right</Button>
          <Button iconLeft={icon} iconRight={icon}>Both Icons</Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="line" iconLeft={icon}>Line + Icon</Button>
          <Button variant="line" iconRight={icon}>Line + Icon</Button>
        </div>
      </div>
    );
  },
};
