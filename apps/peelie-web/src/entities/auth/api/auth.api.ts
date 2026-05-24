import api from '@/shared/api/ky';
import type { ApiResponse } from '@/shared/api/types';

import type {
  AppleAppLoginData,
  AppleAppLoginRequest,
  CompleteOnboardingData,
  CompleteOnboardingRequest,
  KakaoAppLoginData,
  KakaoAppLoginRequest,
  KakaoWebLoginData,
  KakaoWebLoginRequest,
} from '../model/auth.type';

export const authPost = {
  kakaoWebLogin: async (request: KakaoWebLoginRequest): Promise<KakaoWebLoginData> => {
    const wrapped = await api
      .post('auth/oauth/kakao/web/login', { json: request })
      .json<ApiResponse<KakaoWebLoginData>>();
    return wrapped.data;
  },

  appleAppLogin: async (request: AppleAppLoginRequest): Promise<AppleAppLoginData> => {
    const wrapped = await api
      .post('auth/oauth/apple/app/login', { json: request })
      .json<ApiResponse<AppleAppLoginData>>();
    return wrapped.data;
  },

  kakaoAppLogin: async (request: KakaoAppLoginRequest): Promise<KakaoAppLoginData> => {
    const wrapped = await api
      .post('auth/oauth/kakao/app/login', { json: request })
      .json<ApiResponse<KakaoAppLoginData>>();
    return wrapped.data;
  },

  completeOnboarding: async (
    request: CompleteOnboardingRequest,
  ): Promise<CompleteOnboardingData> => {
    const { signupToken, ...body } = request;
    const wrapped = await api
      .post('auth/onboarding/complete', {
        json: body,
        headers: { Authorization: `Bearer ${signupToken}` },
      })
      .json<ApiResponse<CompleteOnboardingData>>();
    return wrapped.data;
  },
};
