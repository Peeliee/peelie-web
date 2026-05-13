import { useEffect, useState } from 'react';
import Modal from '@/shared/ui/common/Modal/Modal';
import ToggleSelect from '@/shared/ui/common/ToggleSelect/ToggleSelect';
import { XIcon } from '@/shared/ui/icons/XIcon';
import type { FriendSummary } from '@/entities/friendship/model/friendship.type';
import { CompletePanel } from './CompletePanel';
import { EnterCodePanel } from './EnterCodePanel';
import { RelationshipPanel } from './RelationshipPanel';
import { ShareCodePanel } from './ShareCodePanel';

type Tab = 'share' | 'enter';
type Step = 'input' | 'relationship' | 'complete';

const TABS = [
  { value: 'share', label: '내 코드 공유' },
  { value: 'enter', label: '친구 코드 입력' },
];

interface FriendCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FriendCodeModal({ isOpen, onClose }: FriendCodeModalProps) {
  const [step, setStep] = useState<Step>('input');
  const [tab, setTab] = useState<Tab>('share');
  const [friendName, setFriendName] = useState('');

  // 모달 닫힘 애니메이션 종료 후 상태 초기화 (다음 열림에 Step 1부터)
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setStep('input');
      setTab('share');
      setFriendName('');
    }, 350);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleShare = () => {
    // TODO: 코드 공유 로직 (Web Share API 또는 클립보드 복사)
  };

  const handleRegisterCode = (friend: FriendSummary) => {
    setFriendName(friend.name);
    setStep('relationship');
  };

  const handleSubmitRelationship = (_relationship: string) => {
    // TODO: 친구 관계 등록 API 호출
    setStep('complete');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdrop={false}
      closeOnEscape={false}
      className="bg-transparent p-0 w-80"
    >
      <div className="flex flex-col items-center gap-4">
        {/* 1번째 스텝 */}
        {step === 'input' && (
          <>
            <ToggleSelect items={TABS} value={tab} onChange={(v) => setTab(v as Tab)} />
            {tab === 'share' ? (
              <ShareCodePanel onShare={handleShare} />
            ) : (
              <EnterCodePanel onRegister={handleRegisterCode} />
            )}
          </>
        )}

        {/* 2번째 스텝 */}
        {step === 'relationship' && <RelationshipPanel onSubmit={handleSubmitRelationship} />}

        {/* 3번째 스텝 */}
        {step === 'complete' && <CompletePanel friendName={friendName} onHome={onClose} />}
        
        <button type="button" onClick={onClose} aria-label="닫기">
          <XIcon />
        </button>
      </div>
    </Modal>
  );
}
