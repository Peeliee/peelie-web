import type { ChatRoomListItem } from '@/entities/chatroom';

export const ChatRoomsMock: { data: ChatRoomListItem[]; delay: number } = {
  delay: 200,
  data: [
    {
      chatRoomId: 'chr_001',
      friend: { id: 'usr_001', name: '김나은', personality: 'STRAIGHT_SHOOTER' },
      meetDate: '2026-05-20T00:00:00.000Z',
      lastMessageAt: '2026-05-13T03:52:35.610Z',
    },
    {
      chatRoomId: 'chr_002',
      friend: { id: 'usr_002', name: '박지원', personality: 'QUIET_CHARMER' },
      meetDate: '2026-05-18T00:00:00.000Z',
      lastMessageAt: '2026-05-12T18:24:11.100Z',
    },
  ],
};
