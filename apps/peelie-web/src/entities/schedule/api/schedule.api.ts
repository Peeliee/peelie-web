import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';

import type {
  CreateScheduleRequest,
  ListSchedulesParams,
  Schedule,
  TodayDDayItem,
} from '../model/schedule.type';

export const scheduleGet = {
  list: async (params?: ListSchedulesParams): Promise<Schedule[]> => {
    const wrapped = await api
      .get('schedules', {
        searchParams: {
          ...(params?.filter && { filter: params.filter }),
          ...(params?.order && { order: params.order }),
        },
      })
      .json<ApiResponse<Schedule[]>>();
    return wrapped.data;
  },

  detail: async (id: string): Promise<Schedule> => {
    const wrapped = await api.get(`schedules/${id}`).json<ApiResponse<Schedule>>();
    return wrapped.data;
  },

  todayDday: async (): Promise<TodayDDayItem[]> => {
    const wrapped = await api.get('today-dday').json<ApiResponse<TodayDDayItem[]>>();
    return wrapped.data;
  },
};

export const schedulePost = {
  create: async (request: CreateScheduleRequest): Promise<Schedule> => {
    const wrapped = await api.post('schedules', { json: request }).json<ApiResponse<Schedule>>();
    return wrapped.data;
  },
};
