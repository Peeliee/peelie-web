import { useMutation } from '@tanstack/react-query';

import { pushPut } from '../api/push.api';

export const useUpsertPushTokenMutation = () => {
  return useMutation({
    mutationFn: pushPut.upsertToken,
  });
};
