import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';

import { Header } from '@/widgets/header/Header';
import { ChatRoomCard, useGetChatListQuery } from '@/entities/chatroom';
import PATH from '@/shared/constants/path';
import { isInWebView } from '@/shared/lib/isInWebView';
import { cn } from '@/shared/lib/utils';

import { SearchInput } from './ui/SearchInput';
import { useDelayedSearch } from './hooks';

export default function AiChatPage() {
  const inWebView = isInWebView();

  const navigate = useNavigate();
  const { data } = useGetChatListQuery();
  const { keyWord, setKeyWord, query } = useDelayedSearch();

  const chatList = useMemo(() => data?.data ?? [], [data?.data]);

  const filteredList = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return chatList;
    return chatList.filter((room) => room.friend.name.includes(trimmed));
  }, [chatList, query]);

  return (
    <SsgoiTransition id="/ai-chat">
      <div className={cn(inWebView && 'pt-10')} />
      <Header />
      <div className="px-5">
        <SearchInput
          className="mt-4"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <ul>
          {filteredList.map((room) => (
            <li key={room.chatRoomId}>
              <ChatRoomCard
                userName={room.friend.name}
                personality={room.friend.personality}
                lastMessage={room.lastMessagePreview}
                lastMessageAt={room.lastMessageAt}
                isUnread={room.isUnread}
                onClick={() => navigate(`${PATH.CHAT_ROOM}/${room.chatRoomId}`)}
              />
            </li>
          ))}
        </ul>
      </div>
    </SsgoiTransition>
  );
}
