import { Fragment, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';

import { AvatarMessage, useGreeting, useSendChatMessage } from '@/features/chatroom';
import {
  buildRenderItems,
  ChatInput,
  DateSeparator,
  UserBubble,
  getRenderItemCreatedAt,
  getRenderItemKey,
  isSameDay,
  useGetChatMessagesQuery,
  type RenderItem,
  type StreamingState,
} from '@/entities/chatroom';

import { ChatRoomHeader } from './ui/ChatRoomHeader';

export default function ChatRoomPage() {
  const { chatRoomId = '' } = useParams<{ chatRoomId: string }>();

  const { data: messagesData } = useGetChatMessagesQuery(chatRoomId);
  const initialMessages = messagesData?.data.items ?? [];

  const { turn: greetingTurn } = useGreeting(chatRoomId);
  const { state: sendState, history, send } = useSendChatMessage(chatRoomId);

  const [input, setInput] = useState('');

  const streaming: StreamingState =
    sendState.status === 'sending'
      ? { kind: 'sending', userMessage: sendState.userMessage }
      : sendState.status === 'streaming'
        ? {
            kind: 'streaming',
            userMessage: sendState.userMessage,
            bubbles: sendState.bubbles,
            suggestions: sendState.suggestions,
          }
        : { kind: 'none' };

  const isBusy = sendState.status === 'sending' || sendState.status === 'streaming';

  // streaming pending 의 createdAt 은 매 호출마다 새로 만들면 key 가 흔들리니 한 번만 만든다.
  // initialMessages/history 가 바뀌면 다시 계산.
  const items = useMemo(
    () =>
      buildRenderItems({
        initialMessages,
        greetingTurn,
        history,
        streaming,
        nowIso: new Date().toISOString(),
      }),
    [initialMessages, greetingTurn, history, streaming],
  );

  const handleSubmit = () => {
    if (!input.trim()) return;
    send(input);
    setInput('');
  };

  const handleSuggestionSelect = (text: string) => {
    if (isBusy) return;
    send(text);
  };

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

          {items.map((item, i) => {
            const prev = items[i - 1];
            const showDate =
              !prev || !isSameDay(getRenderItemCreatedAt(prev), getRenderItemCreatedAt(item));
            return (
              <Fragment key={getRenderItemKey(item, i)}>
                {showDate && <DateSeparator date={getRenderItemCreatedAt(item)} />}
                {renderItem(item, handleSuggestionSelect)}
              </Fragment>
            );
          })}
        </div>

        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isBusy}
        />
      </div>
    </SsgoiTransition>
  );
}

function renderItem(item: RenderItem, onSuggestionSelect: (text: string) => void) {
  switch (item.kind) {
    case 'message': {
      const { message, isLastAvatarTurn } = item;
      if (message.role === 'USER') {
        return (
          <div className="flex justify-end">
            <UserBubble content={message.bubbles[0]?.text ?? ''} createdAt={message.createdAt} />
          </div>
        );
      }
      return (
        <AvatarMessage
          bubbles={message.bubbles}
          createdAt={message.createdAt}
          suggestions={isLastAvatarTurn ? message.suggestions : undefined}
          onSuggestionSelect={isLastAvatarTurn ? onSuggestionSelect : undefined}
        />
      );
    }
    case 'streaming-user':
      return (
        <div className="flex justify-end">
          <UserBubble content={item.text} createdAt={item.createdAt} />
        </div>
      );
    case 'streaming-avatar':
      // 스트리밍 중에는 suggestions 받았더라도 클릭 막음 (isBusy 인 상태이므로 노출만)
      return (
        <AvatarMessage
          bubbles={item.bubbles}
          createdAt={item.createdAt}
          suggestions={item.suggestions.length > 0 ? item.suggestions : undefined}
        />
      );
  }
}
