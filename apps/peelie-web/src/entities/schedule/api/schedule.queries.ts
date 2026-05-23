import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { ListSchedulesParams } from '../model/schedule.type';
import { scheduleGet } from './schedule.api';

export const scheduleQueries = createQueryKeys('schedule', {
  list: (params?: ListSchedulesParams) => ({
    queryKey: ['list', params ?? {}],
    queryFn: () => scheduleGet.list(params),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => scheduleGet.detail(id),
  }),
});
