import { useQuery } from '@tanstack/react-query';

import { scheduleQueries } from '../api/schedule.queries';

export const useGetSchedulesQuery = () => {
  return useQuery({
    ...scheduleQueries.list(),
  });
};
