import { useState } from 'react';
import { Question } from '@/features/onboarding/ui/Question';

export const OnboardingQuestionForm = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswer = (level: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [level]: value }));
  };

  return (
    <div className="space-y-6">
      <Question
        level={0}
        title="영화는 어떻게 즐기는 편인가요?"
        options={['극장 관람 위주', 'OTT 스트리밍 위주', 'TV/VOD 위주', '상황에 따라 다 섞어서']}
        onAnswer={(val) => handleAnswer('L0', val)}
      />

      {answers.L0 && (
        <Question
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
        />
      )}

      {answers.L1 && (
        <Question
          level={2}
          title="영화를 볼 때, 특히 어떤 요소를 보나요?"
          options={['스토리/각본', '연출/영상미', '배우/캐릭터', '음악', '세계관']}
          onAnswer={(val) => handleAnswer('L2', val)}
        />
      )}

      {answers.L2 && (
        <Question
          level={3}
          title="영화에서 기억에 남는 경험은 어떤 유형인가요?"
          options={['스케일', '연출', '추억']}
          onAnswer={(val) => handleAnswer('L3', val)}
        />
      )}
    </div>
  );
};
