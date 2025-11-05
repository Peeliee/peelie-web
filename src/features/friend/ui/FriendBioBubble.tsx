import { useState } from 'react';
import { SpeechBubble } from '@/shared/ui/common/SpeechBubble/SpeechBubble';
import { TypedText } from '@/features/friend/ui/TypedText';
import { bioToHTML } from '@/features/friend/lib/bioToHTML';
import type { BioSegment } from '@/entities/friend/model/friend.type';

export const FriendBioBubble = ({ bio }: { bio: BioSegment[] }) => {
  const [motionKey, setMotionKey] = useState<number>(0);

  return (
    <SpeechBubble
      key={motionKey}
      variant="primary"
      tailPosition="center"
      className="absolute bottom-34 z-990 w-80 body-1-regular"
    >
      <TypedText
        htmlString={bioToHTML(bio)}
        speed={30}
        delayBetweenLoops={3000}
        onRestart={() => setMotionKey((prev) => prev + 1)}
      />
    </SpeechBubble>
  );
};
