import { useMutation } from '@tanstack/react-query';

import { authPost } from '../api/auth.api';

export const useAppleAppLoginMutation = () => {
  return useMutation({
    mutationFn: authPost.appleAppLogin,
  });
};
