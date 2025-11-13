import api from '@/shared/api/ky';
import type { UserRequestDTO, UserResponseDTO } from '../model/user.type';

export const userPatch = {
  patchMyInfo: async (userInfo: UserRequestDTO): Promise<UserResponseDTO> => {
    const response = await api
      .patch('profile', { json: { userInfo } })
      .json<UserResponseDTO>();
    return response;
  },
};
