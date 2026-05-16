import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatroomPost } from '../api/chatroom.api';
import { chatroomQueries } from '../api/chatroom.queries';

export function useMarkReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatRoomId: string) => chatroomPost.markRead(chatRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatroomQueries.chatList.queryKey });
    },
  });
}
