import { useState } from 'react';
import { useAddFriendshipMutation } from '@/entities/friendship';
import type { FriendSummary } from '@/entities/friendship/model/friendship.type';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/common/Input';
import { ModalCharacterIcon } from '@/shared/ui/icons/ModalCharacterIcon';

interface EnterCodePanelProps {
  onRegister: (friend: FriendSummary) => void;
  initialCode?: string;
}

export function EnterCodePanel({ onRegister, initialCode }: EnterCodePanelProps) {
  const [code, setCode] = useState(initialCode ?? '');
  const { mutate: addFriendship, isPending } = useAddFriendshipMutation();

  return (
    <div className={cn('relative h-[400px] w-full overflow-hidden rounded-large', 'bg-gray-01')}>
      {/* 상단: 캐릭터 + 안내 문구 */}
      <div
        className={cn(
          'absolute left-1/2 top-[29px] flex -translate-x-1/2',
          'flex-col items-center gap-3',
        )}
      >
        <ModalCharacterIcon />
        <p className="text-body-l-500 font-medium whitespace-nowrap text-gray-99">
          친구 코드를 입력해 친구를 추가해보세요!
        </p>
      </div>

      {/* 코드 입력 필드 */}
      <div
        className={cn(
          'absolute left-[28px] top-[124px] flex w-[264px] flex-col rounded-small border px-3 py-2',
          'border-border-main has-[[data-focused]]:border-brand-50',
        )}
      >
        <span className="text-caption text-text-disabled">친구 코드</span>
        <Input
          value={code}
          onChange={(e) => setCode((e.target as HTMLInputElement).value)}
          placeholder="코드를 입력해주세요."
          className={cn(
            'w-full bg-transparent text-body-1 text-text-main outline-none',
            'placeholder:text-text-disabled',
          )}
        />
      </div>

      {/* 캐릭터 + 말풍선 (이미지) */}
      <img
        src="/write-friend-code.png"
        alt=""
        className={cn(
          'absolute left-1/2 top-[198px] h-[111px] w-[230px]',
          '-translate-x-1/2 object-contain',
        )}
      />

      {/* 등록 버튼 + 안내 텍스트 */}
      <div
        className={cn(
          'absolute left-1/2 top-[302px] flex -translate-x-1/2',
          'flex-col items-center gap-2',
        )}
      >
        <button
          type="button"
          onClick={() => addFriendship({ friendCode: code }, { onSuccess: onRegister })}
          disabled={isPending || !code}
          className={cn(
            'flex h-12 w-[264px] items-center justify-center',
            'rounded-full bg-gray-70 text-body-m-400 text-gray-01 disabled:opacity-50',
          )}
        >
          코드 등록하기
        </button>
        <p className="text-caption-m-400 text-text-disabled">본인의 코드는 입력할 수 없습니다.</p>
      </div>
    </div>
  );
}
