import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';

import type {
  CreateScheduleRequest,
  Schedule,
} from '../model/schedule.type';

export const scheduleGet = {
  list: async (): Promise<Schedule[]> => {
    const wrapped = await api.get('schedules').json<ApiResponse<Schedule[]>>();
    return wrapped.data;
  },

  detail: async (id: string): Promise<Schedule> => {
    const wrapped = await api
      .get(`schedules/${id}`)
      .json<ApiResponse<Schedule>>();
    return wrapped.data;
  },
};

export const schedulePost = {
  create: async (request: CreateScheduleRequest): Promise<Schedule> => {
    const wrapped = await api
      .post('schedules', { json: request })
      .json<ApiResponse<Schedule>>();
    return wrapped.data;
  },
};
