import type { PersonalityType } from './personality.type';

export interface ChatListFriend {
  id: string;
  name: string;
  personality: PersonalityType;
  isWithdrawn: boolean;
  isFriend: boolean;
}

export interface ChatListItem {
  chatRoomId: string;
  friend: ChatListFriend;
  /** ISO. BE Date 가 JSON serialize 되면 string. */
  lastMessageAt: string;
  /** bubbles 텍스트 " " join + 60자 자름. 메시지 없으면 null. */
  lastMessagePreview: string | null;
  /** lastMessageAt > lastReadAt 이면 true. */
  isUnread: boolean;
}
