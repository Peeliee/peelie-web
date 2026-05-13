import ky from 'ky';
import type { ExtendedKyHttpError, KyHttpError } from './types';

const errorInterceptor = async (error: KyHttpError): Promise<ExtendedKyHttpError> => {
  const responseData = await error.response.json();
  return {
    ...error,
    errorData: responseData,
  };
};

/** 개발 환경에서만 로그 출력 */
const logOnDev = (message: string) => {
  if (import.meta.env.MODE === 'development') {
    console.log(message);
  }
};

/**
 * 401 자동 로그아웃에서 제외할 path.
 * 카카오 콜백/온보딩 같은 공개 인증 API는 401 가능성이 있어도
 * /login 으로 튕기면 안 됨 (호출부에서 직접 처리).
 */
const SKIP_401_REDIRECT_PATHS = [
  '/auth/oauth/kakao/web/login',
  '/auth/onboarding/complete',
  '/auth/dev/signup-token',
];

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL + '/api/v1', // TODO: 추후 url 고치기
  // credentials: 'include',
  timeout: 5000,
  retry: 2,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
        logOnDev(`[API REQUEST] ${request.method} ${request.url}`);
      },
    ],
    afterResponse: [
      async (req, _opt, res) => {
        logOnDev(`[API RESPONSE ${res.status}] ${req.method} ${req.url}`);
        if (res.status === 401) {
          const pathname = new URL(req.url).pathname;
          const shouldSkip = SKIP_401_REDIRECT_PATHS.some((p) =>
            pathname.endsWith(p),
          );
          if (!shouldSkip) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        }
        return res;
      },
    ],
    beforeError: [errorInterceptor],
  },
});

export default api;
