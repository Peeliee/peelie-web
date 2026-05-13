import { useMutation } from '@tanstack/react-query';

import { authPost } from '../api/auth.api';

export const useCompleteOnboardingMutation = () => {
  return useMutation({
    mutationFn: authPost.completeOnboarding,
  });
};
