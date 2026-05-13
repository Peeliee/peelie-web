import { useQuery } from '@tanstack/react-query';

import { userQueries } from '../api/user.queries';

export const useGetMeQuery = () => {
  return useQuery({
    ...userQueries.me(),
  });
};
