import api from '@/shared/api/ky';

import type { StepInfoCardResponseDTO, UserResponseDTO } from '../model/user.type';

export const userGet = {
  getUserStepInfo: async (): Promise<StepInfoCardResponseDTO> => {
    const response = await api.get('onboarding/card/status').json<StepInfoCardResponseDTO>();
    return response;
  },
  getUserInfo: async (): Promise<UserResponseDTO> => {
    const response = await api.get('profile').json<UserResponseDTO>();
    return response;
  },
};
