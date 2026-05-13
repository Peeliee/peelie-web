import { createQueryKeys } from '@lukemorales/query-key-factory';
import { chatroomGet } from './chatroom.api';

export const chatroomQueries = createQueryKeys('chatroom', {
  /** AI챗 목록 (preview + isUnread) */
  chatList: {
    queryKey: null,
    queryFn: () => chatroomGet.getChatList(),
  },
  /** 홈 활성 약속 목록 */
  rooms: {
    queryKey: null,
    queryFn: () => chatroomGet.getChatRooms(),
  },
  /** 채팅방 메시지 (첫 페이지) */
  messages: (chatRoomId: string) => ({
    queryKey: [chatRoomId],
    queryFn: () => chatroomGet.getChatMessages(chatRoomId),
  }),
});
