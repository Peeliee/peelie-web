import type { PersonalityType } from '@/shared/constants/personality';

export interface FriendSummary {
  id: string;
  name: string;
  personality: PersonalityType;
  isWithdrawn: boolean;
}

export interface AddFriendshipRequest {
  friendCode: string;
}
