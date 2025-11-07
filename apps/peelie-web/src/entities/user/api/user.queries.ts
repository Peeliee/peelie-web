import { createQueryKeys } from '@lukemorales/query-key-factory';

import { userGet } from './user-get';

export const userStepInfoQuery = createQueryKeys('userStepInfo', {
  userStepInfo: () => ({
    queryKey: ['userStepInfo'],
    queryFn: userGet.getUserStepInfo,
  }),
});
