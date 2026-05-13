import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';

import type { MeData, UpdateMeRequest } from '../model/user.type';

export const userGet = {
  me: async (): Promise<MeData> => {
    const wrapped = await api.get('users/me').json<ApiResponse<MeData>>();
    return wrapped.data;
  },
};

export const userPatch = {
  me: async (request: UpdateMeRequest): Promise<MeData> => {
    const wrapped = await api.patch('users/me', { json: request }).json<ApiResponse<MeData>>();
    return wrapped.data;
  },
};
