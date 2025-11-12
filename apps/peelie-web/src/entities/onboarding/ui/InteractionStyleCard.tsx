import { StatusProgress } from '@/shared/ui/common/Progress/StatusProgress';
import BalancedCharacter from '@/assets/character/balancedCharacter.svg?react';
import FastCharacter from '@/assets/character/fastCharacter.svg?react';
import CautiousCharacter from '@/assets/character/cautiousCharacter.svg?react';
import Background from '@/assets/background/background.svg?react';
import Shadow from '@/assets/character/shadow.svg?react';
import { Badge } from '@/shared/ui/common/Badge/Badge';
import { SpeechBubble } from '@/shared/ui/common/SpeechBubble/SpeechBubble';
import type { SpeechBubbleVariant } from '@/shared/ui/common/SpeechBubble/SpeechBubble';
import { cn } from '@/shared/lib/utils';

interface InteractionStyleCardProps {
  type: 'balanced' | 'fast' | 'cautious';
  isActive: boolean;
}

const CONFIG = {
  balanced: {
    bg: 'bg-gradient-to-b from-[var(--color-peelie-positive-600)] to-[var(--color-peelie-gray-000)]',
    label: '균형형',
    bubbleText: `
          나는 상황을 잘 읽고 조율하는
          <br />
          <span class="body-1-bold leading-none">균형형</span>이야
        `,
    CharacterImage: BalancedCharacter,
    progress: [3, 4, 2],
    bubbleColor: 'fast',
  },
  fast: {
    bg: 'bg-gradient-to-b from-[var(--color-peelie-secondary-200)] to-[var(--color-peelie-gray-000)]',
    label: '신속형',
    bubbleText: `
      난 생각보다 행동이 먼저인
      <br />
      <span class="body-1-bold leading-none">신속형</span>이야
    `,
    CharacterImage: FastCharacter,
    progress: [2, 3, 4],
    bubbleColor: 'balanced',
  },
  cautious: {
    bg: 'bg-gradient-to-b from-[var(--color-peelie-primary-600)] to-[var(--color-peelie-gray-000)]',
    label: '신중형',
    bubbleText: `
      나는 상황을 잘 읽고 조율하는
      <br />
      <span class="body-1-bold leading-none">신중형</span>이야
    `,
    CharacterImage: CautiousCharacter,
    progress: [4, 2, 1],
    bubbleColor: 'cautious',
  },
};

export const InteractionStyleCard = ({ type, isActive }: InteractionStyleCardProps) => {
  const { bg, label, bubbleText, CharacterImage, progress, bubbleColor } = CONFIG[type];
  console.log(type);
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-start rounded-2xl p-4 w-[278px] shadow-elevation-3',
        bg,
      )}
    >
      {/* 말풍선 */}
      {isActive && (
        <div className="relative top-50 right-40">
          <SpeechBubble
            key={`${type}-${isActive}`}
            className="absolute bottom-28.5 left-11 z-990 body-1-regular w-56"
            variant={bubbleColor as SpeechBubbleVariant}
          >
            <span dangerouslySetInnerHTML={{ __html: bubbleText }} />
          </SpeechBubble>
        </div>
      )}

      {/* 캐릭터 섹션 */}
      <div className="relative w-full flex items-center justify-center">
        {/* 배경 */}
        <Background className="w-full" />

        {/* 캐릭터 */}
        <CharacterImage className="absolute bottom-4 z-1" />

        {/* 그림자 */}
        <Shadow className="absolute bottom-0.5" />
      </div>

      <Badge variant={'green'} badgeType={'fill'} className="my-2">
        {label}
      </Badge>
      {/* 하단 정보 */}
      <div className="flex flex-col w-full rounded-xl gap-2 text-left detail-regular">
        <div>
          <p className="mb-1">판단력</p>
          <StatusProgress currentStep={progress[0]} />
        </div>
        <div>
          <p className="mb-1">소통력</p>
          <StatusProgress currentStep={progress[1]} />
        </div>
        <div>
          <p className="mb-1">적응력</p>
          <StatusProgress currentStep={progress[2]} />
        </div>
      </div>
    </div>
  );
};
