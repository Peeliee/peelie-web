import { createQueryKeys } from '@lukemorales/query-key-factory';

import { friendshipGet } from './friendship.api';

export const friendshipQueries = createQueryKeys('friendship', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => friendshipGet.list(),
  }),
});
