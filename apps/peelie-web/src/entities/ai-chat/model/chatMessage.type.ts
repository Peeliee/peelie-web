export type ChatRole = 'USER' | 'AVATAR';

export interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface ChatMessageList {
  messages: ChatMessage[];
}
