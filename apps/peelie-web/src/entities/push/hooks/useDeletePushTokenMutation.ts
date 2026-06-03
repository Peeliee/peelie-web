import { useMutation } from '@tanstack/react-query';

import { pushDelete } from '../api/push.api';

export const useDeletePushTokenMutation = () => {
  return useMutation({
    mutationFn: pushDelete.removeToken,
  });
};
