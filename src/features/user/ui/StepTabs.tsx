import { useState, type ReactNode } from 'react';

interface StepTabProps {
  title: string;
  locked?: boolean;
  children: ReactNode;
}

interface StepTabsProps {
  children: React.ReactElement<StepTabProps>[];
}

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
