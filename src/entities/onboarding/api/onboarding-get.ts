import api from '@/shared/api/ky';

import { type StepInfoCardResponseDTO } from '../model/onboarding.type';

export const onboardingGet = {
  getUserStepInfo: async (): Promise<StepInfoCardResponseDTO> => {
    const response = await api.get('onboarding/card/status').json<StepInfoCardResponseDTO>();
    return response;
  },
};
