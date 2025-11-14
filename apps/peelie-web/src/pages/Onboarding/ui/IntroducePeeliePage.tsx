import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FullSwiperWrapper } from '@/shared/ui/common/Carousel/SwiperWrapper';
import { useOnboardingProgress } from '../context/OnboardingProgressContext';
import { Button } from '@/shared/ui/common/button';

import MockImg from '@/assets/mockImg.svg?react';

const INTRO_TEXTS = [
  `처음 만난 사람 앞에서 
   얼마나 나를 알려줄 지 망설였다면 
   Peelie 는 그 마음부터 함께 할게요`,

  `가까워질수록 
   나의 마음도 조금씩 드러나요. 
   Peelie 는 그 흐름을 따라 함께 움직여요`,

  `부담 없이, 당신의 속도에 맞게 
   천천히 당신의 리듬으로 시작해볼까요? \n\n`,
];

interface IntroducePeeliePageProps {
  onNext: () => void;
}

const IntroducePeeliePage = ({ onNext }: IntroducePeeliePageProps) => {
  const { setShowProgress } = useOnboardingProgress();

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setShowProgress(false);
    return () => setShowProgress(true);
  }, [setShowProgress]);

  return (
    <div className="flex flex-col justify-between items-center">
      {/* 상단 로고/텍스트 */}
      <div className="flex flex-col w-full justify-start">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="heading-3-medium mt-10 ml-4 whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {INTRO_TEXTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      {/* 캐러셀 */}
      <FullSwiperWrapper onChange={(i) => setIndex(i)}>
        <MockImg className="w-80 h-80" />

        <MockImg className="w-80 h-80" />

        <MockImg className="w-80 h-80" />
      </FullSwiperWrapper>
      {/* 시작하기 버튼 */}

      <Button
        variant={'primary'}
        size={'extraLarge'}
        onClick={onNext}
        className="fixed bottom-4 inset-x-4"
      >
        시작하기
      </Button>
    </div>
  );
};

export default IntroducePeeliePage;
