import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';

import type { AddFriendshipRequest, FriendSummary } from '../model/friendship.type';

export const friendshipGet = {
  list: async (): Promise<FriendSummary[]> => {
    const wrapped = await api.get('friendships').json<ApiResponse<FriendSummary[]>>();
    return wrapped.data;
  },
};

export const friendshipPost = {
  add: async (request: AddFriendshipRequest): Promise<FriendSummary> => {
    const wrapped = await api
      .post('friendships', { json: request })
      .json<ApiResponse<FriendSummary>>();
    return wrapped.data;
  },
};
