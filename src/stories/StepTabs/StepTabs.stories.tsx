import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepTabs, StepTab } from '@/features/user/ui/StepTabs';

type StepTabsStoryArgs = {
  lockStep1: boolean;
  lockStep2: boolean;
  lockStep3: boolean;
};

const meta: Meta<typeof StepTabs> = {
  title: 'Tabs/StepTabs',
  component: StepTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
StepTabs 컴포넌트  

- children으로 StepTab을 전달
- StepTab의 \`locked\` 속성으로 잠금 여부를 제어  
- Controls 패널에서 step 잠금 여부를 직접 토글 가능
        `,
      },
    },
  },
  // 타입 단언으로 에러 회피 (스토리북에서 자주 쓰는 방식)
  argTypes: {
    lockStep1: { control: 'boolean', description: 'STEP 1 잠금 여부' },
    lockStep2: { control: 'boolean', description: 'STEP 2 잠금 여부' },
    lockStep3: { control: 'boolean', description: 'STEP 3 잠금 여부' },
  } as any,
};
export default meta;

type Story = StoryObj<StepTabsStoryArgs>;

export const TabComponent: Story = {
  args: {
    lockStep1: false,
    lockStep2: false,
    lockStep3: true,
  },
  render: (args) => (
    <div className="w-100">
      <StepTabs>
        <StepTab title="STEP 1" locked={args.lockStep1}>
          <div>
            {args.lockStep1 ? (
              '첫 번째 내용 (잠김)'
            ) : (
              <div>
                첫번째 내용
                <br />
                첫번째 내용
              </div>
            )}
          </div>
        </StepTab>
        <StepTab title="STEP 2" locked={args.lockStep2}>
          <div>
            {args.lockStep2 ? (
              '두 번째 내용 (잠김)'
            ) : (
              <div>
                두번째 내용
                <br />
                두번째 내용
              </div>
            )}
          </div>
        </StepTab>
        <StepTab title="STEP 3" locked={args.lockStep3}>
          <div>
            {args.lockStep3 ? (
              '세 번째 내용 (잠김)'
            ) : (
              <div>
                세번째 내용
                <br />
                세번째 내용
              </div>
            )}
          </div>
        </StepTab>
      </StepTabs>
    </div>
  ),
};
