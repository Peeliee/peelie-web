type PersonalityType =
  | 'STRAIGHT_SHOOTER'
  | 'ENERGETIC_TALKER'
  | 'QUIET_CHARMER'
  | 'ANALYTICAL_OBSERVER'
  | 'HEART_COLLECTOR'
  | 'STAGE_SETTER';

export interface FriendSummary {
  id: string;
  name: string;
  personality: PersonalityType;
}

export interface AddFriendshipRequest {
  friendCode: string;
}
