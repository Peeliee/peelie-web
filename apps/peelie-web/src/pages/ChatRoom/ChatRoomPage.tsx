import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';

import {
  AvatarMessage,
  SuggestionList,
  useGreeting,
  useMarkRead,
  useSendChatMessage,
} from '@/features/chatroom';
import {
  AvatarTypingBubble,
  buildRenderItems,
  ChatInput,
  DateSeparator,
  UserBubble,
  getRenderItemCreatedAt,
  getRenderItemKey,
  isSameDay,
  useGetChatListQuery,
  useGetChatMessagesQuery,
  type RenderItem,
  type StreamingState,
} from '@/entities/chatroom';
import { cn } from '@/shared/lib/utils';
import { isInWebView } from '@/shared/lib/isInWebView';

import { ChatBlockedModal } from './ui/ChatBlockedModal';
import { ChatRoomHeader } from './ui/ChatRoomHeader';
import { useChatGuard } from './hooks/useChatGuard';

const NEAR_BOTTOM_THRESHOLD_PX = 80;
const CHAT_SCROLL_CONTAINER_ID = 'chat-room-scroll';
const CHAT_ROOM_BACKGROUND_IMAGE = 'url(/chatroom-background.png)';

function getChatScrollContainer() {
  return document.getElementById(CHAT_SCROLL_CONTAINER_ID);
}

const SMOOTH_SCROLL_DURATION_MS = 600;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function scrollToBottom(scrollContainer: HTMLElement, behavior: ScrollBehavior = 'auto') {
  if (behavior === 'auto') {
    scrollContainer.scrollTo({ top: scrollContainer.scrollHeight });
    return;
  }

  const start = scrollContainer.scrollTop;
  const end = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  const distance = end - start;
  if (distance <= 0) return;

  const startTime = performance.now();
  function step(now: number) {
    const t = Math.min((now - startTime) / SMOOTH_SCROLL_DURATION_MS, 1);
    scrollContainer.scrollTop = start + distance * easeOutCubic(t);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function ChatRoomPage() {
  const inWebView = isInWebView();

  const { chatRoomId = '' } = useParams<{ chatRoomId: string }>();

  const { data: messagesData } = useGetChatMessagesQuery(chatRoomId);
  const initialMessages = useMemo(
    () => messagesData?.data.items ?? [],
    [messagesData?.data.items],
  );

  const { data: chatListData } = useGetChatListQuery();
  const currentRoom = chatListData?.data.find((r) => r.chatRoomId === chatRoomId);

  const { state: sendState, history, send } = useSendChatMessage(chatRoomId);
  const { isBlocked, blockReason, guardedSend, modalOpen, closeModal } = useChatGuard({
    currentRoom,
    send,
  });
  const { turn: greetingTurn, pending: greetingPending } = useGreeting(chatRoomId, !isBlocked);

  useMarkRead({ chatRoomId, historyLength: history.length, greetingTurn });

  const [input, setInput] = useState('');

  const streaming: StreamingState = useMemo(() => {
    if (sendState.status === 'sending') {
      return { kind: 'sending', userMessage: sendState.userMessage };
    }

    if (sendState.status === 'streaming') {
      return {
        kind: 'streaming',
        userMessage: sendState.userMessage,
        bubbles: sendState.bubbles,
        suggestions: sendState.suggestions,
      };
    }

    return { kind: 'none' };
  }, [sendState]);

  const isBusy = sendState.status === 'sending' || sendState.status === 'streaming';

  const items = useMemo(
    () =>
      buildRenderItems({
        initialMessages,
        greetingTurn,
        history,
        streaming,
        greetingPending,
        nowIso: new Date().toISOString(),
      }),
    [initialMessages, greetingTurn, history, streaming, greetingPending],
  );

  const isInitialScrolledRef = useRef(false);
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    if (isInitialScrolledRef.current) return;
    if (!messagesData) return;

    const scrollContainer = getChatScrollContainer();
    if (!scrollContainer) return;

    const rafId = requestAnimationFrame(() => {
      scrollToBottom(scrollContainer);
      isInitialScrolledRef.current = true;
    });

    return () => cancelAnimationFrame(rafId);
  }, [messagesData]);

  useEffect(() => {
    const scrollContainer = getChatScrollContainer();
    if (!scrollContainer) return;

    const handleUserScroll = () => {
      requestAnimationFrame(() => {
        const distance =
          scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight;
        stickToBottomRef.current = distance < NEAR_BOTTOM_THRESHOLD_PX;
      });
    };

    scrollContainer.addEventListener('scroll', handleUserScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleUserScroll);
    };
  }, []);

  useEffect(() => {
    if (!isInitialScrolledRef.current) return;
    if (!stickToBottomRef.current) return;
    const rafId = requestAnimationFrame(() => {
      const scrollContainer = getChatScrollContainer();
      if (!scrollContainer) return;
      scrollToBottom(scrollContainer, 'smooth');
    });
    return () => cancelAnimationFrame(rafId);
  }, [items]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    guardedSend(input);
    setInput('');
  };

  const handleSuggestionSelect = (text: string) => {
    if (isBusy) return;
    setInput(text);
  };

  return (
    <SsgoiTransition id={`/chat-room/${chatRoomId}`}>
      <div
        aria-hidden
        className="fixed inset-0 bg-cover bg-top"
        style={{ backgroundImage: CHAT_ROOM_BACKGROUND_IMAGE }}
      />
      <div className="relative flex h-dvh w-full flex-col">
        <div
          className={cn(
            'shrink-0 overflow-hidden',
            'bg-cover bg-top',
            inWebView && 'pt-10',
          )}
          style={{ backgroundImage: CHAT_ROOM_BACKGROUND_IMAGE }}
        >
          <ChatRoomHeader
            name={currentRoom?.friend.name}
            personality={currentRoom?.friend.personality}
          />
        </div>

        <div
          id={CHAT_SCROLL_CONTAINER_ID}
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          <div className={cn('flex min-h-full flex-col justify-end gap-1', 'px-4 py-2')}>
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
                  {renderItem(item, handleSuggestionSelect, currentRoom?.friend.name)}
                </Fragment>
              );
            })}
          </div>
        </div>

        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isBusy}
          position="static"
          className={cn('shrink-0', inWebView && 'pb-8')}
        />
      </div>
      {blockReason && (
        <ChatBlockedModal isOpen={modalOpen} reason={blockReason} onClose={closeModal} />
      )}
    </SsgoiTransition>
  );
}

function renderItem(
  item: RenderItem,
  onSuggestionSelect: (text: string) => void,
  name: string | undefined,
) {
  switch (item.kind) {
    case 'message': {
      const { message, isLastAvatarTurn, isGreeting, isFromHistory } = item;
      if (message.role === 'USER') {
        return (
          <div className="flex justify-end">
            <UserBubble content={message.bubbles[0]?.text ?? ''} createdAt={message.createdAt} />
          </div>
        );
      }
      const showSuggestions = isLastAvatarTurn && message.suggestions.length > 0;
      return (
        <>
          <AvatarMessage
            bubbles={message.bubbles}
            createdAt={message.createdAt}
            name={name}
            animate={isGreeting}
          />
          {showSuggestions && (
            <SuggestionList
              suggestions={message.suggestions}
              onSelect={onSuggestionSelect}
              createdAt={message.createdAt}
              className={isFromHistory ? 'chat-slide-up-in' : undefined}
            />
          )}
        </>
      );
    }
    case 'streaming-user':
      return (
        <div className="chat-slide-up-in flex justify-end">
          <UserBubble content={item.text} createdAt={item.createdAt} />
        </div>
      );
    case 'streaming-avatar':
      return (
        <AvatarMessage bubbles={item.bubbles} createdAt={item.createdAt} name={name} animate />
      );
    case 'streaming-placeholder':
      return (
        <AvatarTypingBubble showHeader={item.showHeader} name={name} className="chat-slide-up-in" />
      );
  }
}
