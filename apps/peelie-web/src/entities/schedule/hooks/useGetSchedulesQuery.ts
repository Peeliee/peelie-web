import { useQuery } from '@tanstack/react-query';

import { scheduleQueries } from '../api/schedule.queries';
import type { ListSchedulesParams } from '../model/schedule.type';

export const useGetSchedulesQuery = (params?: ListSchedulesParams) => {
  return useQuery({
    ...scheduleQueries.list(params),
  });
};
