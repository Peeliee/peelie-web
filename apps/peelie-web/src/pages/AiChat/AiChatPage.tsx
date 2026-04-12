import { useNavigate } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';

export default function AiChatPage() {
  const navigate = useNavigate();

  return (
    <SsgoiTransition id="/ai-chat">
      <div className={cn('flex flex-col items-center justify-center min-h-screen', 'gap-4')}>
        <h1 className="text-title-headline-1 text-gray-99">AI챗</h1>
        <Button color="tertiary" size="sm" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </div>
    </SsgoiTransition>
  );
}
