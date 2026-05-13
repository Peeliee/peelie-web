import { useMutation } from '@tanstack/react-query';

import { authPost } from '../api/auth.api';

export const useKakaoWebLoginMutation = () => {
  return useMutation({
    mutationFn: authPost.kakaoWebLogin,
  });
};
