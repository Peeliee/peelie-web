import type { ApiResponse } from '@/shared/api/types';

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

export type ChatMessageListResponseDTO = ApiResponse<ChatMessageList>;
