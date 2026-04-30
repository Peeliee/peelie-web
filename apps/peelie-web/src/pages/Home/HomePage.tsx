import { useState } from 'react';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { Header } from '@/widgets/header/Header';
import { cn } from '@/shared/lib/utils';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { FriendCodeModal } from '@/widgets/FriendCodeModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SsgoiTransition id="/">
      <Header onShareClick={() => setIsModalOpen(true)} />

      <div className={cn('flex flex-col items-center justify-center', 'min-h-screen gap-6 ')}>
        <h1 className="heading-1-medium text-gray-99">Home</h1>
      </div>

      <Button
        size={'lg'}
        radius={'full'}
        iconLeft={<PlusIcon />}
        className="fixed bottom-[60px] left-1/2 -translate-x-1/2 px-4"
      >
        일정 추가하기
      </Button>
      <FriendCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        myCode="n7f0yure"
      />
    </SsgoiTransition>
  );
}
