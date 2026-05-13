import type { PersonalityType } from './auth.type';

export interface MeData {
  id: string;
  name: string;
  personality: PersonalityType;
  friendCode: string;
  createdAt: string;
}

export interface UpdateMeRequest {
  name?: string;
  personality?: PersonalityType;
}
