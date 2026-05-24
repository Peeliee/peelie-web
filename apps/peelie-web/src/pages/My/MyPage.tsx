import { useNavigate } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';
import { isInWebView } from '@/shared/lib/isInWebView';

export default function MyPage() {
  const inWebView = isInWebView();

  const navigate = useNavigate();

  return (
    <SsgoiTransition id="/my">
      <div className={cn(inWebView && 'pt-10')} />
      <div className={cn('flex flex-col items-center justify-center min-h-screen', 'gap-4')}>
        <h1 className="text-title-headline-1 text-gray-99">마이페이지</h1>
        <Button color="tertiary" size="sm" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </div>
    </SsgoiTransition>
  );
}
