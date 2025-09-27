import { Link } from 'react-router-dom';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { InteractionStyleCarousel } from '@/features/onboarding/ui/InteractionStyleCarousel';
import { INTERACTION_STYLES } from '@/shared/constants/interactionStyle';


const SelectInteractionStylePage = () => {
  const [current, setCurrent] = useState<number>(0);
  const style = INTERACTION_STYLES[current];
  console.log(style);
  return (
    <div className="text-center py-10">
      <h3 className="mb-2 mt-10">교류 성향 선택</h3>
      <h1 className="text-xl font-bold mb-10">나의 교류 유형은?</h1>

      <InteractionStyleCarousel current={current} onChange={setCurrent} />

      <p className="mt-25 text-gray-400">마이페이지에서 교류 성향을 수정할 수 있어요</p>

      <Link
        to={`/finish-onboarding/${current}`}
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
      >
        선택하기
      </Link>
    </div>
  );
};

export default SelectInteractionStylePage;
