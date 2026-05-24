import type { PersonalityType } from '@/shared/constants/personality';

export interface FriendSummary {
  id: string;
  name: string;
  personality: PersonalityType;
  isDeleted: boolean;
}

export interface AddFriendshipRequest {
  friendCode: string;
}
