import type { PersonalityType } from '@/shared/constants/personality';

export interface ScheduleDate {
  year: number;
  month: number;
  day: number;
}

export interface Schedule {
  id: string;
  meetDate: string;
  description: string;
  createdAt: string;
  friendUser: {
    id: string;
    name: string;
    personality: PersonalityType;
    isWithdrawn: boolean;
  };
  chatRoom: {
    id: string;
  };
}

export interface CreateScheduleRequest {
  friendUserId: string;
  meetDate: string;
  description: string;
}

export type ScheduleFilter = 'upcoming' | 'past' | 'all';
export type ScheduleOrder = 'asc' | 'desc';

export interface ListSchedulesParams {
  filter?: ScheduleFilter;
  order?: ScheduleOrder;
}

export interface TodayDDayFriend {
  id: string;
  name: string;
  personality: PersonalityType;
}

export interface TodayDDayItem {
  scheduleId: string;
  chatRoomId: string;
  friend: TodayDDayFriend;
  meetDate: string;
  description: string;
  summary: string | null;
}
