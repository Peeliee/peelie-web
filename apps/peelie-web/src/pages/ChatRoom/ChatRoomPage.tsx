import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import { ChatRoomHeader } from './ui/ChatRoomHeader';
import { AvatarMessage } from '@/features/chatroom';
import { UserBubble, DateSeparator, ChatInput, isSameDay } from '@/entities/chatroom';
import { useGetChatMessagesQuery } from '@/entities/ai-chat';

export default function ChatRoomPage() {
  const { chatRoomPublicId = '' } = useParams<{ chatRoomPublicId: string }>();
  const { data } = useGetChatMessagesQuery(chatRoomPublicId);
  const messages = data?.data.messages ?? [];
  const [inputValue, setInputValue] = useState('');

  return (
    <SsgoiTransition id="/chat-room">
      <div
        className="flex h-screen w-full flex-col bg-cover bg-center"
        style={{ backgroundImage: 'url(/chatroom-background.png)' }}
      >
        <ChatRoomHeader />

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-28 pt-4">
          <div className="flex justify-center py-2">
            <span className="px-4 py-1 text-caption-m-400 text-gray-01 text-center">
              지금 대화는 AI를 통해 생성되었습니다.
              <br /> 실제 친구가 하는 말과 차이가 있거나 부정확할 수 있습니다.
            </span>
          </div>
          {messages.map((message, index) => {
            const prev = messages[index - 1];
            const showDate = !prev || !isSameDay(prev.createdAt, message.createdAt);

            return (
              <div key={message.id}>
                {showDate && <DateSeparator date={message.createdAt} />}
                {message.role === 'AVATAR' ? (
                  <AvatarMessage content={message.content} createdAt={message.createdAt} />
                ) : (
                  <div className="flex justify-end">
                    <UserBubble content={message.content} createdAt={message.createdAt} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={() => setInputValue('')}
        />
      </div>
    </SsgoiTransition>
  );
}
