import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/app/provider/userContext';

import { userPatch } from '../api/user.patch';

export const useEditProfile = () => {
  const navigate = useNavigate();
  const { refetchUser } = useUser();

  return useMutation({
    mutationFn: userPatch.patchMyInfo,
    onSuccess: async () => {
      await refetchUser();
      navigate(-1);
    },
    onError: (err) => {
      console.error('프로필 수정 실패:', err);
    },
  });
};
