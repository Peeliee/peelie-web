import api from '@/shared/api/ky';

import type { UpsertPushTokenRequest } from '../model/push.type';

export const pushPut = {
  upsertToken: async (request: UpsertPushTokenRequest): Promise<void> => {
    await api.put('users/me/push-token', { json: request });
  },
};

export const pushDelete = {
  removeToken: async (): Promise<void> => {
    await api.delete('users/me/push-token');
  },
};
