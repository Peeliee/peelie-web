import { useQuery } from '@tanstack/react-query';

import { scheduleQueries } from '../api/schedule.queries';

export const useGetTodayDDayQuery = () => {
  return useQuery({
    ...scheduleQueries.todayDday(),
  });
};
