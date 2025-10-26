import { useQuery } from '@tanstack/react-query';

import { userStepInfoQuery } from '../api/user.queries';

export const useUserStepInfo = () => {
  const queryDef = userStepInfoQuery.userStepInfo();

  return useQuery({
    ...queryDef,
    refetchInterval: (query) => (query.state.data?.data.generationStatus === 'DONE' ? false : 1000),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
