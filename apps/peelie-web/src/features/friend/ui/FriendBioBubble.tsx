import React,{ useState } from 'react';
import { SpeechBubble } from '@/shared/ui/common/SpeechBubble/SpeechBubble';
import { TypedText } from '@/features/friend/ui/TypedText';
import { bioToHTML } from '@/features/friend/lib/bioToHTML';
import { cn } from '@/shared/lib/utils';

export interface BioSegment {
  text: string;
  bold: boolean;
}

export type SpeechBubbleVariant =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'fast'
  | 'balanced'
  | 'cautious';
type TailPosition = 'center' | 'bottom-left' | 'left';

interface FriendBioBubbleProps {
  bio: BioSegment[];
  variant?: SpeechBubbleVariant;
  tailPosition?: TailPosition;
  repeat?: boolean;
  className?: string;
}

export const FriendBioBubble = React.memo(
  ({ bio, variant, tailPosition, repeat = true, className }: FriendBioBubbleProps) => {
    const [motionKey, setMotionKey] = useState<number>(0);

    return (
      <SpeechBubble
        key={motionKey}
        variant={variant}
        tailPosition={tailPosition}
        className={cn('absolute z-990 body-1-regular', className)}
      >
        <TypedText
          htmlString={bioToHTML(bio)}
          speed={30}
          repeat={repeat}
          delayBetweenLoops={3000}
          onRestart={() => setMotionKey((prev) => prev + 1)}
        />
      </SpeechBubble>
    );
  },
);
