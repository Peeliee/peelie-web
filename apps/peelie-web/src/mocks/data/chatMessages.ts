import type { ChatMessageListPayload } from '@/entities/chatroom';

type RoomMessages = Record<string, ChatMessageListPayload>;

export const ChatMessagesMock: { data: RoomMessages; delay: number } = {
  delay: 200,
  data: {
    chr_001: {
      items: [
        {
          id: 'msg_chr001_001',
          role: 'AVATAR',
          bubbles: [
            { text: '안녕! 오랜만이야', delayMs: 1500 },
            { text: '요즘 어떻게 지내?', delayMs: 800 },
          ],
          suggestions: ['잘 지내!', '바빴어 ㅠ', '너는 어때?'],
          createdAt: '2026-05-13T03:52:00.000Z',
        },
        {
          id: 'msg_chr001_002',
          role: 'USER',
          bubbles: [{ text: '잘 지내! 너는?', delayMs: 0 }],
          suggestions: [],
          createdAt: '2026-05-13T03:52:18.000Z',
        },
        {
          id: 'msg_chr001_003',
          role: 'AVATAR',
          bubbles: [
            { text: '나도 그럭저럭~', delayMs: 1500 },
            { text: '주말에 시간 있어?', delayMs: 700 },
            { text: '약속 잡았던 거 정해야지', delayMs: 600 },
          ],
          suggestions: ['응 시간 돼!', '주말은 좀…', '몇 시쯤?'],
          createdAt: '2026-05-13T03:52:35.610Z',
        },
      ],
      nextCursor: null,
    },
    chr_002: {
      items: [
        {
          id: 'msg_chr002_001',
          role: 'AVATAR',
          bubbles: [{ text: '오늘 약속 정해진거 잊지 마! 7시야', delayMs: 1500 }],
          suggestions: ['응 기억하고 있어', '어디서?', '뭐 챙겨가?'],
          createdAt: '2026-05-12T18:24:11.100Z',
        },
      ],
      nextCursor: null,
    },
    chr_003: { items: [], nextCursor: null },
  },
};
