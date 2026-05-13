export type PersonalityType =
  | 'STRAIGHT_SHOOTER'
  | 'ENERGETIC_TALKER'
  | 'QUIET_CHARMER'
  | 'ANALYTICAL_OBSERVER'
  | 'HEART_COLLECTOR'
  | 'STAGE_SETTER';

export interface KakaoWebLoginRequest {
  code: string;
}

export interface LoginTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginSuccessData extends LoginTokens {
  type: 'login';
}

export interface SignupNeededData {
  type: 'signup';
  signupToken: string;
}

export type KakaoWebLoginData = LoginSuccessData | SignupNeededData;

export interface CompleteOnboardingRequest {
  signupToken: string;
  nickname: string;
  personality: PersonalityType;
}

export interface CompleteOnboardingData extends LoginTokens {
  user: {
    id: string;
    nickname: string;
    personality: PersonalityType;
    friendCode: string;
  };
}
