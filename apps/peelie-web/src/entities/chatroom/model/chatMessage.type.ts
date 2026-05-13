export type ChatRole = 'USER' | 'AVATAR';

export interface ChatBubble {
  text: string;
  /**
   * 이 버블 도착 전 BE 가 대기한 시간 (ms).
   * 저장 모델 호환을 위해 유지하지만 FE 는 이 값으로 절대 setTimeout 을 호출하지 않는다.
   * (BE 가 이미 sleep 후 yield)
   */
  delayMs: number;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  bubbles: ChatBubble[];
  /** AVATAR 만 3 개. USER 는 빈 배열. */
  suggestions: string[];
  /** ISO. */
  createdAt: string;
}

export interface ChatMessageListPayload {
  items: ChatMessage[];
  nextCursor: string | null;
}
