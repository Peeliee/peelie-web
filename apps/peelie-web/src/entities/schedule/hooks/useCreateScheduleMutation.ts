import { useMutation, useQueryClient } from '@tanstack/react-query';

import { schedulePost } from '../api/schedule.api';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulePost.create,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
