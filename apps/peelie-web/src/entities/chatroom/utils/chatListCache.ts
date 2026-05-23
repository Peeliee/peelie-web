import type { QueryClient } from '@tanstack/react-query';

import type { ApiResponse } from '@/shared/api/types';

import { chatroomQueries } from '../api/chatroom.queries';
import type { ChatListItem } from '../model/chatList.type';

type ChatListData = ApiResponse<ChatListItem[]>;

export function patchChatListPreview(qc: QueryClient, chatRoomId: string, preview: string): void {
  const at = new Date().toISOString();
  qc.setQueryData<ChatListData>(chatroomQueries.chatList.queryKey, (old) => {
    if (!old) return old;
    return {
      ...old,
      data: old.data.map((item) =>
        item.chatRoomId === chatRoomId
          ? { ...item, lastMessagePreview: preview, lastMessageAt: at, isUnread: true }
          : item,
      ),
    };
  });
}

export function markReadInCache(qc: QueryClient, chatRoomId: string): void {
  qc.setQueryData<ChatListData>(chatroomQueries.chatList.queryKey, (old) => {
    if (!old) return old;
    return {
      ...old,
      data: old.data.map((item) =>
        item.chatRoomId === chatRoomId ? { ...item, isUnread: false } : item,
      ),
    };
  });
}
