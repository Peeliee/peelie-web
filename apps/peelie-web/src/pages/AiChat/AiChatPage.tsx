import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';

import { Header } from '@/widgets/header/Header';
import { ChatListItem, useGetChatRoomsQuery } from '@/entities/ai-chat';
import { Button } from '@/shared/ui/common/button';
import { cn } from '@/shared/lib/utils';
import PATH from '@/shared/constants/path';

import { SearchInput } from './ui/SearchInput';
import { useDelayedSearch } from './hooks';

const HARDCODED_USER_INFO = {
  badge: '직진 본능파',
  userName: '김나은',
  lastMessage: '그럼 너는 쉬는 시간에 주로 OTT 보는 걸 즐겨??????',
};

export default function AiChatPage() {
  const navigate = useNavigate();
  const { data: chatRoomListData } = useGetChatRoomsQuery();
  const { keyWord, setKeyWord, query } = useDelayedSearch();

  const roomList = chatRoomListData?.data.chatRooms ?? [];

  const filteredRoomList = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return roomList;
    return roomList.filter(() => HARDCODED_USER_INFO.userName.includes(trimmed));
  }, [roomList, query]);

  return (
    <SsgoiTransition id="/ai-chat">
      <Header />
      <div className="px-5">
        <SearchInput
          className="mt-4"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <ul>
          {filteredRoomList.map((room) => (
            <li key={room.chatRoomPublicId}>
              <ChatListItem
                userName={HARDCODED_USER_INFO.userName}
                badge={HARDCODED_USER_INFO.badge}
                lastMessage={HARDCODED_USER_INFO.lastMessage}
                lastMessageAt={room.lastMessageAt}
                onClick={() => navigate(`${PATH.CHAT_ROOM}/${room.chatRoomPublicId}`)}
              />
            </li>
          ))}
        </ul>
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
