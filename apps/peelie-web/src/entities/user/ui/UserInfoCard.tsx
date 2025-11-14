import Character from '@/assets/character/categoryQuestionCharacter.svg?react';
import { SpeechBubble } from '@/shared/ui/common/SpeechBubble/SpeechBubble';
import { Chip } from '@/shared/ui/common/Chip/Chip';
import { cn } from '@/shared/lib/utils';

interface UserInfoCardProps {
  level: number;
  title: string;
  className?: string;
}

export const UserInfoCard = ({ level, title, className }: UserInfoCardProps) => {
  return (
    <div
      className={cn(
        'w-58 h-79 rounded-3xl pb-10 bg-gradient-to-b from-[#F7A73C] to-[#ED8C2C]',
        className,
      )}
    >
      {/* === Level Chip === */}
      <Chip
        variant="secondary"
        chipType="default"
        size="medium"
        className="bg-white text-peelie-gray-900 border-none mb-4 shadow-sm"
      >
        Lv {level}
      </Chip>

      {/* === Title === */}
      <h2 className="text-peelie-gray-000 heading-3-semibold whitespace-pre-line mb-10">{title}</h2>

      {/* === Speech Bubble + Character === */}
      <div className="flex items-end justify-between w-full">
        {/* SpeechBubble */}
        <SpeechBubble
          variant="secondary"
          tailPosition="left"
          className="max-w-[220px] text-peelie-gray-950 text-body-1-regular"
        >
          ㅎㅇ
        </SpeechBubble>

        {/* Character */}
        <Character className="w-32 h-auto" />
      </div>
    </div>
  );
};
