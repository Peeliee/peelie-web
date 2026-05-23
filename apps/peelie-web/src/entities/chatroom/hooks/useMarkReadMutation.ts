import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatroomPost } from '../api/chatroom.api';
import { markReadInCache } from '../utils/chatListCache';

export function useMarkReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatRoomId: string) => chatroomPost.markRead(chatRoomId),
    onSuccess: (_, chatRoomId) => {
      markReadInCache(queryClient, chatRoomId);
    },
  });
}
