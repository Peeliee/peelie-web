import { useMutation, useQueryClient } from '@tanstack/react-query';

import { schedulePost } from '../api/schedule.api';
import { scheduleQueries } from '../api/schedule.queries';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulePost.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.list._def,
      });
    },
  });
};
