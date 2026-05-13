import type { PersonalityType } from './personality.type';

export interface ChatRoomListFriend {
  id: string;
  name: string;
  personality: PersonalityType;
}

export interface ChatRoomListItem {
  chatRoomId: string;
  friend: ChatRoomListFriend;
  meetDate: string;
  lastMessageAt: string;
}
