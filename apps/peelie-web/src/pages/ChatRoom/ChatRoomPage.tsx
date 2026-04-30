import { SsgoiTransition } from '@ssgoi/react';
import { ChatRoomHeader } from './ui/ChatRoomHeader';

export default function ChatRoomPage() {
  return (
    <SsgoiTransition id="/chat-room">
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: 'url(/chatroom-background.png)' }}
      >
        <ChatRoomHeader />
      </div>
    </SsgoiTransition>
  );
}
