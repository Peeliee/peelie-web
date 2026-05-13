import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userPatch } from '../api/user.api';
import { userQueries } from '../api/user.queries';

export const useUpdateMeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userPatch.me,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.me._def,
      });
    },
  });
};
