import type { ChatRoomItem, ChatRoomList } from '@/entities/ai-chat/model/chatRoom.type';
import type { ChatMessageList } from '@/entities/ai-chat/model/chatMessage.type';

export const ChatRoomListMock: { data: ChatRoomList; delay: number } = {
  data: {
    chatRooms: [
      {
        chatRoomPublicId: 'chr_abc123',
        friendId: 2,
        lastMessageAt: '2026-05-01T21:30:00',
      },
      {
        chatRoomPublicId: 'chr_def456',
        friendId: 3,
        lastMessageAt: '2026-05-01T18:00:00',
      },
      {
        chatRoomPublicId: 'chr_ghi789',
        friendId: 4,
        lastMessageAt: '2026-04-30T10:15:00',
      },
    ] satisfies ChatRoomItem[],
  },
  delay: 500,
};

export const ChatMessagesMock: { data: Record<string, ChatMessageList>; delay: number } = {
  data: {
    chr_abc123: {
      messages: [
        { id: 1, role: 'USER',   content: '안녕! 오늘 뭐했어?',                         createdAt: '2026-05-01T21:20:00' },
        { id: 2, role: 'AVATAR', content: '오늘은 집에서 영화 봤어요. 요즘 감성 영화에 빠졌거든요 🎬', createdAt: '2026-05-01T21:20:05' },
        { id: 3, role: 'USER',   content: '오 어떤 영화?',                              createdAt: '2026-05-01T21:25:00' },
        { id: 4, role: 'AVATAR', content: '비포 선라이즈요. 처음 봤는데 대화가 너무 좋더라고요.',   createdAt: '2026-05-01T21:25:08' },
        { id: 5, role: 'USER',   content: '고전이지~ 나도 좋아해',                        createdAt: '2026-05-01T21:30:00' },
        { id: 6, role: 'AVATAR', content: '진짜요? 나중에 같이 보면서 이야기 나눠요!',         createdAt: '2026-05-01T21:30:10' },
      ],
    },
    chr_def456: {
      messages: [
        { id: 7,  role: 'USER',   content: '요즘 잘 지내?',                             createdAt: '2026-05-01T17:50:00' },
        { id: 8,  role: 'AVATAR', content: '네! 요즘 전시회 다니는 재미에 빠졌어요 🎨',       createdAt: '2026-05-01T17:50:07' },
        { id: 9,  role: 'USER',   content: '어떤 전시?',                                createdAt: '2026-05-01T17:55:00' },
        { id: 10, role: 'AVATAR', content: '근처 갤러리에서 하는 사진전이요. 되게 잔잔하고 좋았어요.', createdAt: '2026-05-01T18:00:00' },
      ],
    },
    chr_ghi789: {
      messages: [
        { id: 11, role: 'USER',   content: '안녕~',                     createdAt: '2026-04-30T10:10:00' },
        { id: 12, role: 'AVATAR', content: '안녕하세요! 처음 대화네요 😊',   createdAt: '2026-04-30T10:10:05' },
        { id: 13, role: 'USER',   content: '요즘 뭐에 관심 있어?',          createdAt: '2026-04-30T10:12:00' },
        { id: 14, role: 'AVATAR', content: '즉흥 여행이요! 주말마다 어딘가 떠나고 싶어요.', createdAt: '2026-04-30T10:15:00' },
      ],
    },
  },
  delay: 500,
};
