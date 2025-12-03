import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FullSwiperWrapper } from '@/shared/ui/common/Carousel/SwiperWrapper';
import { useOnboardingProgress } from '../context/OnboardingProgressContext';
import { Button } from '@/shared/ui/common/button';

import MockImg from '@/assets/mockImg.svg?react';

const INTRO_CONTENT = [
  {
    main: `교류 성향 캐릭터를 선택하고,
    나에게 맞는 방식으로 친구와 가까워져 봐요`,
    sub: `Peelie는 교류 성향 캐릭터 설정을 통해,
          사용자에게 맞는 교류 속도로 관계를 시작할 수 있도록 도와줘요.`,
  },
  {
    main: `퀴즈를 통해 정보를 하나씩 공개하며,
          자연스럽게 가까워져요`,
    sub: `Peelie의 교류 퀴즈로 단계별로 하나씩 풀어가며,
          친해지고 싶었던 친구와의 교류를 시작해봐요.`,
  },
  {
    main: `단계별 퀴즈를 풀며 얻은 보상으로
          친구의 개인적인 정보와 이야기까지
          가까워져 봐요`,
    sub: `Peelie단 단계별 퀴즈를 풀수록 새로운 보상이 열리고,
          보상을 통해 친구의 취향과 이야기, sns정보를 하나씩 알아갈 수
          있어요.`,
  },
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
            key={`main-${index}`}
            className="heading-3-medium mt-10 ml-4 whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {INTRO_CONTENT[index].main}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${index}`}
            className="body-2-regular text-peelie-gray-500 mt-3 ml-4 whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {INTRO_CONTENT[index].sub}
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
