import type { ChatBubble } from '@/entities/chatroom';

export interface MockTurn {
  bubbles: ChatBubble[];
  suggestions: string[];
}

const SEND_RESPONSES: MockTurn[] = [
  {
    bubbles: [
      { text: '오~ 좋은 생각인데?', delayMs: 1500 },
      { text: '나도 그거 좋아해', delayMs: 700 },
      { text: '같이 가자!', delayMs: 600 },
    ],
    suggestions: ['언제 갈래?', '난 시간 비어!', '어디서 만나?'],
  },
  {
    bubbles: [
      { text: '음… 잠깐만', delayMs: 1500 },
      { text: '그건 좀 생각해봐야겠다', delayMs: 800 },
    ],
    suggestions: ['왜?', '그럼 다른 거?', '괜찮아 ㅋㅋ'],
  },
  {
    bubbles: [{ text: '진짜?', delayMs: 1500 }],
    suggestions: ['응 진짜야', '아니 그냥', '몰라 ㅋㅋ'],
  },
  {
    bubbles: [
      { text: '오늘 날씨 진짜 좋더라', delayMs: 1500 },
      { text: '어디 산책이라도 갈래?', delayMs: 900 },
      { text: '한강 어때', delayMs: 700 },
      { text: '아니면 카페?', delayMs: 700 },
    ],
    suggestions: ['한강 좋지!', '카페 갈래', '집에 있을래'],
  },
];

const GREETING_RESPONSES: MockTurn[] = [
  {
    bubbles: [
      { text: '어 왔구나~', delayMs: 1500 },
      { text: '오늘도 잘 지냈어?', delayMs: 800 },
    ],
    suggestions: ['응 잘 지냈어', '그냥 그래', '너는?'],
  },
  {
    bubbles: [{ text: '오랜만이지! 오늘은 뭐 얘기할까', delayMs: 1500 }],
    suggestions: ['그냥 수다 떨자', '오늘 뭐했어?', '약속 정하자'],
  },
];

let sendCursor = 0;
let greetingCursor = 0;

export function pickMockTurn(): MockTurn {
  const t = SEND_RESPONSES[sendCursor % SEND_RESPONSES.length];
  sendCursor += 1;
  return t;
}

export function pickGreetingTurn(): MockTurn {
  const t = GREETING_RESPONSES[greetingCursor % GREETING_RESPONSES.length];
  greetingCursor += 1;
  return t;
}
