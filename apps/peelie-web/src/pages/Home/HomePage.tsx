import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import PATH from '@/shared/constants/path';
import ToggleSelect from '@/shared/ui/common/ToggleSelect/ToggleSelect';
import Modal from '@/shared/ui/common/Modal/Modal';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';

export default function HomePage() {
  const [selected, setSelected] = useState('share');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SsgoiTransition id="/">
      <div className={cn('flex flex-col items-center justify-center min-h-screen', 'gap-6 bg-amber-300')}>
        <h1 className="heading-1-medium text-gray-99">Home</h1>

        <ToggleSelect
          items={[
            { value: 'share', label: '내 코드 공유' },
            { value: 'input', label: '친구 코드 입력' },
          ]}
          value={selected}
          onChange={setSelected}
        />

        <p className="text-body-2 text-gray-99">
          {selected === 'share' ? '공유 콘텐츠 영역' : '입력 콘텐츠 영역'}
        </p>

        <button
          type="button"
          className="text-body-1 text-gray-99 underline"
          onClick={() => setIsModalOpen(true)}
        >
          모달 열기
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-body-2 font-medium text-gray-99">
              친구를 삭제하시겠어요?
            </h2>
            <p className="text-body-1 text-gray-70 text-center">
              친구를 삭제하면 기존 DM도 함께 삭제되며,
              다시 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-4 w-full">
              <Button color="tertiary" size="lg" radius="medium" className="w-[100px]" onClick={() => setIsModalOpen(false)}>
                닫기
              </Button>
              <Button color="primary" size="lg" radius="medium" className="flex-1" onClick={() => setIsModalOpen(false)}>
                삭제하기
              </Button>
            </div>
          </div>
        </Modal>

        <Link to={PATH.TEST} className="text-body-1 text-brand-100 underline">
          Go to Test Page
        </Link>
      </div>
    </SsgoiTransition>
  );
}
