import { createQueryKeys } from '@lukemorales/query-key-factory';

import { scheduleGet } from './schedule.api';

export const scheduleQueries = createQueryKeys('schedule', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => scheduleGet.list(),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => scheduleGet.detail(id),
  }),
});
