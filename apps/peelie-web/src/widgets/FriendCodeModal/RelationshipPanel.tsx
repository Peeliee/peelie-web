import { useState } from 'react';
import { motion } from 'motion/react';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/common/Input';
import { ModalCharacterIcon } from '@/shared/ui/icons/ModalCharacterIcon';
import { MiniCharcterIcon } from '@/shared/ui/icons/MiniCharcterIcon';

type Selection = 'first-meet' | 'long-time' | 'custom';

interface RelationshipPanelProps {
  onSubmit: (relationship: string) => void;
}

const TRANSITION = { duration: 0.25, ease: 'easeInOut' } as const;

export function RelationshipPanel({ onSubmit }: RelationshipPanelProps) {
  const [selection, setSelection] = useState<Selection>('first-meet');
  const [customText, setCustomText] = useState('');

  const isCustom = selection === 'custom';

  const handleSubmit = () => {
    if (selection === 'first-meet') {
      onSubmit('처음 만나는 사이');
      return;
    }
    if (selection === 'long-time') {
      onSubmit('오랜만에 만나는 사이');
      return;
    }
    onSubmit(customText.trim() || '기타');
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-large bg-gray-01"
      initial={false}
      animate={{ height: isCustom ? 408 : 400 }}
      transition={TRANSITION}
    >
      {/* 상단: 캐릭터 + 안내 */}
      <div className="absolute left-1/2 top-[28px] flex -translate-x-1/2 flex-col items-center gap-3">
        <ModalCharacterIcon />
        <div className="flex flex-col items-center gap-1 whitespace-nowrap text-center">
          <p className="text-body-l-500 text-gray-99">추가한 친구와는 어떤 사이인가요?</p>
          <div className="text-caption text-text-sub">
            <p>입력한 친구 정보는</p>
            <p>더 적절한 서비스 이용을 위해 활용됩니다.</p>
          </div>
        </div>
      </div>

      {/* 옵션 영역 */}
      <div className="absolute left-[28px] top-[165px] flex w-[264px] flex-col gap-2">
        <RelationshipOption
          label="처음 만나는 사이"
          selected={selection === 'first-meet'}
          onClick={() => setSelection('first-meet')}
        />
        <RelationshipOption
          label="오랜만에 만나는 사이"
          selected={selection === 'long-time'}
          onClick={() => setSelection('long-time')}
        />
        {isCustom ? (
          <CustomRelationshipInput value={customText} onChange={setCustomText} />
        ) : (
          <button
            type="button"
            onClick={() => setSelection('custom')}
            className="text-caption text-text-disabled"
          >
            기타
          </button>
        )}
      </div>

      {/* 다음으로 버튼 */}
      <motion.button
        type="button"
        onClick={handleSubmit}
        className="absolute left-[28px] flex h-12 w-[264px] items-center justify-center rounded-full bg-gray-70 text-body-2 text-gray-01"
        initial={false}
        animate={{ top: isCustom ? 332 : 324 }}
        transition={TRANSITION}
      >
        다음으로
      </motion.button>
    </motion.div>
  );
}

interface RelationshipOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function RelationshipOption({ label, selected, onClick }: RelationshipOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-12 w-full items-center gap-2 rounded-small border px-4',
        selected ? 'border-brand-100 bg-brand-30' : 'border-bg-sub',
      )}
    >
      <MiniCharcterIcon className="size-6 shrink-0" />
      <span className={cn('text-body-2', selected ? 'text-body-m-400' : 'text-text-disabled')}>
        {label}
      </span>
    </button>
  );
}

interface CustomRelationshipInputProps {
  value: string;
  onChange: (value: string) => void;
}

function CustomRelationshipInput({ value, onChange }: CustomRelationshipInputProps) {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-small border border-brand-100 bg-brand-30 px-4">
      <MiniCharcterIcon className="size-6 shrink-0" />
      <Input
        autoFocus
        value={value}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        placeholder="직접 입력"
        className="w-full bg-transparent text-body-2 text-body-m-400 outline-none placeholder:text-text-disabled"
      />
    </div>
  );
}
