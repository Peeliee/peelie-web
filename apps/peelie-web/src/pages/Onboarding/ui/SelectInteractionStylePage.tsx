import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { InteractionStyleSwiper } from '@/features/onboarding/ui/InteractionStyleSwiper';
import { INTERACTION_STYLES, type InteractionStyleKey } from '@/shared/constants/interactionStyle';
import { InteractionStyleValueToKey } from '@/shared/constants/interactionStyle';

interface SelectInteractionStylePageProps {
  onNext: (interactionType: InteractionStyleKey) => void;
}

const SelectInteractionStylePage = ({ onNext }: SelectInteractionStylePageProps) => {
  const [current, setCurrent] = useState<number>(0);
  const style = INTERACTION_STYLES[current];
  const interactionStyle = InteractionStyleValueToKey(style.title);

  return (
    <div className="text-center mt-6">
      <InteractionStyleSwiper current={current} onChange={setCurrent} />

      <button
        onClick={() => onNext(interactionStyle)}
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
      >
        선택하기
      </button>
    </div>
  );
};

export default SelectInteractionStylePage;
