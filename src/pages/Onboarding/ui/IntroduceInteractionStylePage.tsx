import { Link } from 'react-router-dom';

import InteractionStyleGroup from '@/assets/interactionStyleGroup.svg?react';
import { cn } from '@/shared/lib/utils';

const IntroduceInteractionStylePage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-2">교류 성향을 선택해요</h1>
        <p className="text-gray-500 text-sm">
          당신의 교류 성향을 알려주세요.
          <br />
          이후 더 잘 맞는 사람과 연결될 수 있어요.
        </p>
      </div>

      <InteractionStyleGroup className='mt-30' />

      <Link
        to="/select-style"
        className={cn(
          'fixed bottom-10 left-6 right-6 py-4 rounded-full text-center font-medium',
          'bg-orange-400 text-white active:bg-orange-500',
        )}
      >
        계속하기
      </Link>
    </div>
  );
};

export default IntroduceInteractionStylePage;
