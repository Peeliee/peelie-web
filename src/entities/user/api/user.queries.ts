import { createQueryKeys } from '@lukemorales/query-key-factory';

import { userGet } from './user-get';

export const userStepInfoQuery = createQueryKeys('stepCard', {
  userStepInfo: () => ({
    queryKey: ['userStepInfo'],
    queryFn: userGet.getUserStepInfo,
  }),
});
