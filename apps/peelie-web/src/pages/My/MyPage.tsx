import { useNavigate } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import { Button } from '@/shared/ui/common/button';

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <SsgoiTransition id="/my">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-title-headline-1 text-gray-99">마이페이지</h1>
        <Button color="tertiary" size="sm" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </div>
    </SsgoiTransition>
  );
}
