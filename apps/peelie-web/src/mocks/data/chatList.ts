import type { ChatListItem } from '@/entities/chatroom';

export const ChatListMock: { data: ChatListItem[]; delay: number } = {
  delay: 200,
  data: [
    {
      chatRoomId: 'chr_001',
      friend: { id: 'usr_001', name: '클로드', personality: 'STRAIGHT_SHOOTER' },
      lastMessageAt: '2026-05-13T03:52:35.610Z',
      lastMessagePreview: '그럼 너는 쉬는 시간에 주로 OTT 보는 편이야? 영화 같이 ...',
      isUnread: true,
    },
    {
      chatRoomId: 'chr_002',
      friend: { id: 'usr_002', name: '지피티', personality: 'QUIET_CHARMER' },
      lastMessageAt: '2026-05-12T18:24:11.100Z',
      lastMessagePreview: '오늘 약속 정해진거 잊지 마! 7시야',
      isUnread: false,
    },
    {
      chatRoomId: 'chr_003',
      friend: { id: 'usr_003', name: '제미나이', personality: 'ENERGETIC_TALKER' },
      lastMessageAt: '2026-05-10T09:05:00.000Z',
      lastMessagePreview: null,
      isUnread: false,
    },
  ],
};
