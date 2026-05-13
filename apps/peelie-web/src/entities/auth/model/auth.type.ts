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

export type Personality = 'STRAIGHT_SHOOTER';

export interface CompleteOnboardingRequest {
  signupToken: string;
  nickname: string;
  personality: Personality;
}

export interface CompleteOnboardingData extends LoginTokens {
  user: {
    id: string;
    nickname: string;
    personality: Personality;
    friendCode: string;
  };
}
