import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userWithdraw } from '../api/user.api';

export const useWithdrawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userWithdraw.me,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
