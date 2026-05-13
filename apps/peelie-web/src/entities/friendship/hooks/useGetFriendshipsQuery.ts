import { useQuery } from '@tanstack/react-query';

import { friendshipQueries } from '../api/friendship.queries';

export const useGetFriendshipsQuery = () => {
  return useQuery({
    ...friendshipQueries.list(),
  });
};
