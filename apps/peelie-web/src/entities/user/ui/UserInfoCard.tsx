import Character from '@/assets/character/categoryQuestionCharacter.svg?react';
import { SpeechBubble } from '@/shared/ui/common/SpeechBubble/SpeechBubble';
import { Chip } from '@/shared/ui/common/Chip/Chip';
import { cn } from '@/shared/lib/utils';

interface UserInfoCardProps {
  level: number;
  title: string;
  isActive: number;
  className?: string;
}

export const UserInfoCard = ({ level, title, isActive, className }: UserInfoCardProps) => {
  return (
    <div
      className={cn(
        'relative w-58 h-79 rounded-400 p-4 bg-linear-to-t from-peelie-primary-600 to-peelie-secondary-200',
        className,
      )}
    >
      <Chip variant="primary" chipType="outline" size="medium" className="mt-2 ml-2">
        Lv {level}
      </Chip>

      {/* === Title === */}
      <h2 className="text-peelie-gray-000 heading-3-semibold whitespace-pre-line mb-10">{title}</h2>

      <div className="flex items-end justify-between w-full">
        {isActive && (
          <SpeechBubble variant="gray" tailPosition="center" className='absolute bottom-30 z-1'>
            <span
              dangerouslySetInnerHTML={{
                __html: `친구에게 소개할 나의 ${level}단계 정보를 확인해봐요!`,
              }}
            />
          </SpeechBubble>
        )}

        <Character  className='absolute bottom-4 right-4'/>
      </div>
    </div>
  );
};
