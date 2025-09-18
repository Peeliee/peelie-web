import type { Meta, StoryObj } from '@storybook/react-vite';
import { CarouselWrapper } from '@/shared/ui/common/Carousel/CarouselWrapper';
import MockImg from '@/assets/mockImg.svg?react';

const meta: Meta<typeof CarouselWrapper> = {
  title: 'Carousel/CarouselWrapper',
  component: CarouselWrapper,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['full', 'peek', 'peekSmall'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
        공용 캐러셀 컴포넌트입니다.
        variant
        - full : 전체 화면
        - peek : 좌우 아이템을 볼 수 있습니다.
        - peekSmall : 좌우 아이템이 작게 보입니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselWrapper>;

export const Default: Story = {
  args: {
    children: [<MockImg />, <MockImg />, <MockImg />, <MockImg />],
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
