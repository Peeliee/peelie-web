import { createQueryKeys } from '@lukemorales/query-key-factory';

import { userGet } from './user.api';

export const userQueries = createQueryKeys('user', {
  me: () => ({
    queryKey: ['me'],
    queryFn: () => userGet.me(),
  }),
});
