import api from '@/shared/api/ky';

import type {
  FriendListResponseDTO,
  FriendProfileResponseDTO,
  RandomFriendListResponseDTO,
} from '../model/friend.type';

export const friendGet = {
  friendList: async (): Promise<FriendListResponseDTO> => {
    const response = await api.get('friends').json<FriendListResponseDTO>();
    return response;
  },

  friendProfile: async (friendId: number): Promise<FriendProfileResponseDTO> => {
    const response = await api.get(`friends/${friendId}`).json<FriendProfileResponseDTO>();
    return response;
  },

  randomFriend: async (): Promise<RandomFriendListResponseDTO> => {
    const response = await api.get('friends/random').json<RandomFriendListResponseDTO>();
    return response;
  },
};
