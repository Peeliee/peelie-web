import { type ApiResponse } from '@/shared/api/types';
import { type InteractionStyleKey } from '@/shared/constants/interactionStyle';
import { type Card } from '@/entities/user/model/user.type';

export interface FriendResponse {
  userId: number;
  userName: string;
  interactionStyle: InteractionStyleKey;
  bio: string;
  stage: number;
  profileUrl: string | null;
}

export interface FriendDetailResponse {
  userId: number;
  userName: string;
  profileImageUrl: string | null;
  instagramId: string | null;
  bio: string;
  interactionStyle: InteractionStyleKey;
  card: Card;
}

export type FriendListResponseDTO = ApiResponse<FriendResponse[]>;
export type FriendDetailResponseDTO = ApiResponse<FriendDetailResponse>;
export type RandomFriendListResponseDTO = ApiResponse<FriendResponse[]>;
