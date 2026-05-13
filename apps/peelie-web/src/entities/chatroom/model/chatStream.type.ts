import type { ChatBubble } from './chatMessage.type';

export type ChatStreamEvent =
  | { type: 'meta'; chatRoomId: string; friendId: string; userId: string }
  | { type: 'bubble'; text: string; delayMs: number }
  | { type: 'suggestions'; suggestions: string[] }
  | { type: 'done'; chatRoomId: string }
  | { type: 'skip' }
  | { type: 'error'; message: string };

/**
 * 로컬에서 누적/보관하는 완료된 턴. send 와 greeting 을 union 으로 분리해
 * userMessage 의 유무를 타입 안전하게 표현.
 */
export type LocalTurn =
  | {
      kind: 'send';
      userMessage: string;
      bubbles: ChatBubble[];
      suggestions: string[];
      completedAt: string;
    }
  | {
      kind: 'greeting';
      bubbles: ChatBubble[];
      suggestions: string[];
      completedAt: string;
    };
