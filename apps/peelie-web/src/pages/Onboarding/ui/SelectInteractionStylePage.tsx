import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { InteractionStyleCarousel } from '@/features/onboarding/ui/InteractionStyleCarousel';
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
    <div className="text-center py-10">
      <h3 className="mb-2 mt-5">교류 성향 선택</h3>
      <h1 className="text-xl font-bold mb-10">나의 교류 유형은?</h1>

      <InteractionStyleCarousel current={current} onChange={setCurrent} />

      <p className="mt-5 text-gray-400">마이페이지에서 교류 성향을 수정할 수 있어요</p>

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
