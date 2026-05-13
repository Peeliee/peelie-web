type PersonalityType =
  | 'STRAIGHT_SHOOTER'
  | 'ENERGETIC_TALKER'
  | 'QUIET_CHARMER'
  | 'ANALYTICAL_OBSERVER'
  | 'HEART_COLLECTOR'
  | 'STAGE_SETTER';

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
