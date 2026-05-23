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

import { ChatRoomHeader } from './ui/ChatRoomHeader';
import { cn } from '@/shared/lib/utils';

const NEAR_BOTTOM_THRESHOLD_PX = 80;
const SUGGESTIONS_DELAY_MS = 1000;
const ROUTE_SCROLL_CONTAINER_ID = 'route-scroll-container';

function getRouteScrollContainer() {
  return document.getElementById(ROUTE_SCROLL_CONTAINER_ID);
}

const SMOOTH_SCROLL_DURATION_MS = 600;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function scrollRouteToBottom(
  scrollContainer: HTMLElement,
  behavior: ScrollBehavior = 'auto',
  syncAfterTransition = false,
) {
  if (behavior === 'auto') {
    scrollContainer.scrollTo({ top: scrollContainer.scrollHeight });
    if (syncAfterTransition) {
      window.setTimeout(() => {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight });
      }, 200);
    }
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
  const { chatRoomId = '' } = useParams<{ chatRoomId: string }>();

  const { data: messagesData } = useGetChatMessagesQuery(chatRoomId);
  const initialMessages = messagesData?.data.items ?? [];

  const { data: chatListData } = useGetChatListQuery();
  const currentRoom = chatListData?.data.find((r) => r.chatRoomId === chatRoomId);

  const { turn: greetingTurn, pending: greetingPending } = useGreeting(chatRoomId);
  const { state: sendState, history, send } = useSendChatMessage(chatRoomId);

  useMarkRead({ chatRoomId, historyLength: history.length, greetingTurn });

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
        greetingPending,
        nowIso: new Date().toISOString(),
      }),
    [initialMessages, greetingTurn, history, streaming, greetingPending],
  );

  // 표시 대상 suggestions 의 ID (마지막 AVATAR message 의 suggestions 가 있을 때).
  // streaming-avatar 의 suggestions 는 idle 전환 후 history 메시지로 옮겨와 처리하므로 여기선 무시.
  const targetSuggestionsId = useMemo(() => {
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      if (it.kind === 'message' && it.isLastAvatarTurn && it.message.suggestions.length > 0) {
        return it.message.id;
      }
    }
    return null;
  }, [items]);

  const [delayedSuggestionsId, setDelayedSuggestionsId] = useState<string | null>(null);

  useEffect(() => {
    if (!targetSuggestionsId) {
      setDelayedSuggestionsId(null);
      return;
    }
    const id = setTimeout(() => setDelayedSuggestionsId(targetSuggestionsId), SUGGESTIONS_DELAY_MS);
    return () => clearTimeout(id);
  }, [targetSuggestionsId]);

  const isInitialScrolledRef = useRef(false);
  // 사용자가 위로 스크롤하면 false. 그 외엔 true 유지하여 새 메시지에 항상 따라감.
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    if (isInitialScrolledRef.current) return;
    if (!messagesData) return;

    const scrollContainer = getRouteScrollContainer();
    if (!scrollContainer) return;

    const rafId = requestAnimationFrame(() => {
      scrollRouteToBottom(scrollContainer, 'auto', true);
      isInitialScrolledRef.current = true;
    });

    return () => cancelAnimationFrame(rafId);
  }, [messagesData]);

  useEffect(() => {
    const scrollContainer = getRouteScrollContainer();
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
    // DOM reflow 직후 측정해야 새 버블 height 까지 반영된 scrollHeight 가 잡힌다.
    const rafId = requestAnimationFrame(() => {
      const scrollContainer = getRouteScrollContainer();
      if (!scrollContainer) return;
      scrollRouteToBottom(scrollContainer, 'smooth');
    });
    return () => cancelAnimationFrame(rafId);
  }, [items, delayedSuggestionsId]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    send(input);
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
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/chatroom-background.png)' }}
      />
      <div className="relative flex min-h-dvh w-full flex-col">
        <div className={cn('sticky top-0 z-10 shrink-0 bg-gray-99/30', 'backdrop-blur-md')}>
          <ChatRoomHeader
            name={currentRoom?.friend.name}
            personality={currentRoom?.friend.personality}
          />
        </div>

        <div className={cn('flex flex-1 flex-col justify-end gap-1', 'px-4 py-2')}>
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
                {renderItem(
                  item,
                  handleSuggestionSelect,
                  delayedSuggestionsId,
                  currentRoom?.friend.name,
                )}
              </Fragment>
            );
          })}
        </div>

        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isBusy}
          position="static"
          className="sticky bottom-0 z-10 shrink-0"
        />
      </div>
    </SsgoiTransition>
  );
}

function renderItem(
  item: RenderItem,
  onSuggestionSelect: (text: string) => void,
  delayedSuggestionsId: string | null,
  name: string | undefined,
) {
  switch (item.kind) {
    case 'message': {
      const { message, isLastAvatarTurn, isGreeting } = item;
      if (message.role === 'USER') {
        return (
          <div className="flex justify-end">
            <UserBubble content={message.bubbles[0]?.text ?? ''} createdAt={message.createdAt} />
          </div>
        );
      }
      const showSuggestions =
        isLastAvatarTurn && message.suggestions.length > 0 && delayedSuggestionsId === message.id;
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
              className="chat-slide-up-in"
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
      // streaming 중 suggestions 가 도착해도 여기선 표시하지 않는다.
      // done 직후 history 로 들어간 message 의 suggestions 가 0.5s 지연 후 표시됨.
      return (
        <AvatarMessage bubbles={item.bubbles} createdAt={item.createdAt} name={name} animate />
      );
    case 'streaming-placeholder':
      return (
        <AvatarTypingBubble showHeader={item.showHeader} name={name} className="chat-slide-up-in" />
      );
  }
}
