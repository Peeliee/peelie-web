import api from '@/shared/api/ky';

import type { StartOnboardingResponseDTO } from '../model/onboarding.type';

export const onboaringPost = {
  startOnboarding: async (): Promise<StartOnboardingResponseDTO> => {
    const response = await api.post('onboarding/start').json<StartOnboardingResponseDTO>();
    return response;
  },
};
