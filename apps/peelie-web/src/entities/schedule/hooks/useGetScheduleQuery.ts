import { useQuery } from '@tanstack/react-query';

import { scheduleQueries } from '../api/schedule.queries';

export const useGetScheduleQuery = (id: string) => {
  return useQuery({
    ...scheduleQueries.detail(id),
    enabled: !!id,
  });
};
