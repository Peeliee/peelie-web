import { useNavigate } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';

import { Header } from '@/widgets/header/Header';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';

import { SearchInput } from './ui/SearchInput';
import { ChatListItem } from './ui/ChatListItem';

export default function AiChatPage() {
  const navigate = useNavigate();

  return (
    <SsgoiTransition id="/ai-chat">
      <Header />
      <div className="px-5">
        <SearchInput className="mt-4" />
        <ChatListItem />
        <div className={cn('flex flex-col items-center justify-center min-h-screen', 'gap-4')}>
          <h1 className="text-title-headline-1 text-gray-99">AI챗</h1>
          <Button color="tertiary" size="sm" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
        </div>
      </div>
    </SsgoiTransition>
  );
}
