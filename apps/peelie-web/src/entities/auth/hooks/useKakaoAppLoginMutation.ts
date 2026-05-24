import { useMutation } from '@tanstack/react-query';

import { authPost } from '../api/auth.api';

export const useKakaoAppLoginMutation = () => {
  return useMutation({
    mutationFn: authPost.kakaoAppLogin,
  });
};
