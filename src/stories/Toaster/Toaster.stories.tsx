import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from 'next-themes';
import { toast } from 'sonner';
import Toaster from '@/shared/ui/common/sonner';

const meta: Meta<typeof Toaster> = {
  title: 'Feedback/Toaster',
  component: Toaster,
  args: {
    richColors: true,
    position: 'top-center',
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Toaster>;

const CustomToast = ({ t }: { t: string | number }) => (
  <div
    style={{
      padding: 12,
      border: '1px solid var(--border)',
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      borderRadius: 8,
      cursor: 'pointer',
    }}
    role="button"
    tabIndex={0}
    onClick={() => toast.dismiss(t)}
    onKeyDown={(e) => e.key === 'Enter' && toast.dismiss(t)}
  >
    커스텀 토스트 (클릭하면 닫힘)
  </div>
);

const renderCustomToast = (t: string | number) => <CustomToast t={t} />;

const DemoButtons = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <button type="button" onClick={() => toast('기본 토스트')}>
      Default
    </button>
    <button type="button" onClick={() => toast.success('성공!')}>
      Success
    </button>
    <button type="button" onClick={() => toast.error('에러!')}>
      Error
    </button>
    <button
      type="button"
      onClick={() =>
        toast.promise(
          new Promise<void>((res) => {
            setTimeout(res, 1200);
          }),
          {
            loading: '처리 중…',
            success: '완료!',
            error: '실패!',
          },
        )
      }
    >
      Promise
    </button>
    <button type="button" onClick={() => toast.custom(renderCustomToast)}>
      Custom
    </button>
  </div>
);

export const Playground: Story = {
  render: (args) => (
    <>
      <DemoButtons />
      <Toaster {...args} />
    </>
  ),
};

export const Dark: Story = {
  render: (args) => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <DemoButtons />
      <Toaster {...args} />
    </ThemeProvider>
  ),
};
