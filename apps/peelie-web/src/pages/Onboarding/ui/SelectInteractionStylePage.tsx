import { useState } from 'react';

import { InteractionStyleSwiper } from '@/features/onboarding/ui/InteractionStyleSwiper';
import { INTERACTION_STYLES, type InteractionStyleKey } from '@/shared/constants/interactionStyle';
import { InteractionStyleValueToKey } from '@/shared/constants/interactionStyle';
import { Button } from '@/shared/ui/common/button';

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

      <Button
        variant={'primary'}
        size={'extraLarge'}
        onClick={() => onNext(interactionStyle)}
        className="fixed bottom-4 inset-x-4"
      >
        선택하기
      </Button>
    </div>
  );
};

export default SelectInteractionStylePage;
