import type { Meta, StoryObj } from '@storybook/react-vite';
import { FullScreenCarousel } from '@/widgets/FullScreenCarousel/FullScreenCarousel';
import MockImg from '@/assets/mockImg.svg?react';

const meta: Meta<typeof FullScreenCarousel> = {
  title: 'Widgets/FullScreenCarousel',
  component: FullScreenCarousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FullScreenCarousel>;

export const Default: Story = {
  args: {
    children: [
      <MockImg className="w-100" />,
      <MockImg className="w-100" />,
      <MockImg className="w-100" />,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '390px', border: '1px solid #ccc' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
