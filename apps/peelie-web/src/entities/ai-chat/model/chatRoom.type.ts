// 채팅방 목록 단일 아이템
export interface ChatRoomItem {
  chatRoomPublicId: string;
  friendId: number;
  lastMessageAt: string;
}

// 채팅방 목록
export interface ChatRoomList {
  chatRooms: ChatRoomItem[];
}
