import type { PersonalityType } from './personality.type';

export interface ChatRoomListFriend {
  id: string;
  name: string;
  personality: PersonalityType;
  isWithdrawn: boolean;
}

export interface ChatRoomListItem {
  chatRoomId: string;
  friend: ChatRoomListFriend;
  meetDate: string;
  registeredAt: string;
  lastMessageAt: string;
}

export type ChatRoomSort = 'recent' | 'stale';

export interface ListChatRoomsParams {
  sort?: ChatRoomSort;
}
