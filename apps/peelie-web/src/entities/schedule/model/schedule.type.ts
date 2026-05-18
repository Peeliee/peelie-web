import type { PersonalityType } from '@/shared/constants/personality';

export interface Schedule {
  id: string;
  meetDate: string;
  description: string;
  createdAt: string;
  friendUser: {
    id: string;
    name: string;
    personality: PersonalityType;
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
