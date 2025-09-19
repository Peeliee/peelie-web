import { useState, type ReactNode } from 'react';

interface StepTabProps {
  title: string;
  locked?: boolean;
  children: ReactNode;
}

interface StepTabsProps {
  children: React.ReactElement<StepTabProps>[];
}

/**
 * StepTabs 컴포넌트
 *
 * - 여러 개의 StepTab을 받아 탭 UI를 렌더링.
 * - 클릭 시 해당 StepTab의 children을 보여줌.
 * - locked가 true인 StepTab은 클릭하면 "잠겨있어요" alert 출력.
 * - StepTabs 는 StepTab 만 children 으로 받게 하기 위해 ReactElement 로 타입을 제한하였습니다. 
 *
 * @example
 * <StepTabs>
 *   <StepTab title="STEP 1">
 *     <div>첫 번째 내용</div>
 *   </StepTab>
 *   <StepTab title="STEP 2">
 *     <div>두 번째 내용 (잠김)</div>
 *   </StepTab>
 *   <StepTab title="STEP 3" locked>
 *     <div>세 번째 내용</div>
 *   </StepTab>
 * </StepTabs>
 * 
 */
const StepTab = (_props: StepTabProps) => {
  return null;
};

const StepTabs = ({ children }: StepTabsProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleClick = (index: number, locked?: boolean) => {
    if (locked) {
      alert('잠겨있어요');
      return;
    }
    setActiveStep(index);
  };

  return (
    <div>
      <div className="flex border-b">
        {children.map((tab, index) => {
          const { title, locked } = tab.props;
          return (
            <button
              key={title}
              onClick={() => handleClick(index, locked)}
              className={`flex-1 py-2 text-center text-sm ${
                activeStep === index
                  ? 'border-b-2 border-black text-black'
                  : locked
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-black'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
      <div className="p-4">{children[activeStep].props.children}</div>
    </div>
  );
};

export { StepTab, StepTabs };
