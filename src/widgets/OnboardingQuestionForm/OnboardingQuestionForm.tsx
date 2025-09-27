import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  OnboardingObjectQuestion,
  OnboardingSubjectQuestion,
} from '@/features/onboarding/ui/OnboardingQuestion';

interface OnboardingQuestionFormProps {
  onChange?: (answers: Record<string, string>) => void;
}

export const OnboardingQuestionForm = ({ onChange }: OnboardingQuestionFormProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswer = (level: string, value: string) => {
    const next = { ...answers, [level]: value };
    setAnswers(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-6">
      <OnboardingObjectQuestion
        level={0}
        title="영화는 어떻게 즐기는 편인가요?"
        options={['극장 관람 위주', 'OTT 스트리밍 위주', 'TV/VOD 위주', '상황에 따라 다 섞어서']}
        onAnswer={(val) => handleAnswer('L0', val)}
      />
      {answers.L0 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingObjectQuestion
            level={1}
            title="자주 손이 가는 장르는 무엇인가요?"
            options={[
              '액션/스릴러',
              '로맨스/멜로',
              '코미디/가족',
              'SF/판타지',
              '드라마/휴먼',
              '다큐/예술영화',
            ]}
            onAnswer={(val) => handleAnswer('L1', val)}
          />{' '}
        </motion.div>
      )}

      {answers.L1 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingObjectQuestion
            level={2}
            title="영화를 볼 때, 특히 어떤 요소를 보나요?"
            options={['스토리/각본', '연출/영상미', '배우/캐릭터', '음악', '세계관']}
            onAnswer={(val) => handleAnswer('L2', val)}
          />{' '}
        </motion.div>
      )}

      {answers.L2 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingObjectQuestion
            level={3}
            title="영화에서 기억에 남는 경험은 어떤 유형인가요?"
            options={['스케일', '연출', '추억']}
            onAnswer={(val) => handleAnswer('L3', val)}
          />
        </motion.div>
      )}

      {answers.L3 && (
        <motion.div
          initial={{ marginTop: -20, opacity: 0, height: 0 }}
          animate={{ marginTop: 0, opacity: 1, height: 'auto' }}
        >
          <OnboardingSubjectQuestion
            level={4}
            title="즐겨본 영화에 대한 한마디를 적어주세요!"
            onAnswer={(val) => handleAnswer('L4', val)}
          />
        </motion.div>
      )}
    </div>
  );
};
