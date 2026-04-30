import api from '@/shared/api/ky';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export function postKakaoLogin(code: string) {
  return api
    .post('auth/oauth/kakao/web/login', { json: { code } })
    .json<LoginResponse>();
}
