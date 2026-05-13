import { useMutation, useQueryClient } from '@tanstack/react-query';

import { friendshipPost } from '../api/friendship.api';
import { friendshipQueries } from '../api/friendship.queries';

export const useAddFriendshipMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendshipPost.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: friendshipQueries.list._def,
      });
    },
  });
};
