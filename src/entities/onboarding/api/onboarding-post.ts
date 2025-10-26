import api from '@/shared/api/ky';

import type {
  StartOnboardingResponseDTO,
  GenerateStepInfoRequestDTO,
} from '../model/onboarding.type';

export const onboardingPost = {
  startOnboarding: async (): Promise<StartOnboardingResponseDTO> => {
    const response = await api.post('onboarding/start').json<StartOnboardingResponseDTO>();
    return response;
  },

  generateStepInfo: async (categoryIds: GenerateStepInfoRequestDTO) => {
    const response = await api.post('onboarding/generate', { json: { categoryIds } });
    return response;
  },
};
