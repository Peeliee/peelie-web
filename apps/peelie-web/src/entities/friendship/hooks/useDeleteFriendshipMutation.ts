import { useMutation, useQueryClient } from '@tanstack/react-query';

import { friendshipDelete } from '../api/friendship.api';

export const useDeleteFriendshipMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendshipDelete.remove,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
