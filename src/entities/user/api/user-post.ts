import api from '@/shared/api/ky';

import type { GenerateStepInfoRequestDTO } from '../model/user.type';

export const userPost = {
  generateUserStepInfo: async (categoryIds: GenerateStepInfoRequestDTO) => {
    const response = await api.post('onboarding/card/generate', { json: { categoryIds } });
    return response;
  },
};
