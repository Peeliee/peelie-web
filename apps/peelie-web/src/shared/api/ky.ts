import ky from 'ky';
import { ApiResponseError } from './types';
import type { ApiErrorMessage, ExtendedKyHttpError, KyHttpError } from './types';
import { getApiBaseUrl } from './baseUrl';
import { clearAuthAndRedirectToLogin, getAuthHeader } from './auth';

const isApiErrorMessage = (value: unknown): value is ApiErrorMessage => {
  if (typeof value !== 'object' || value === null) return false;

  const maybeError = value as Partial<ApiErrorMessage>;
  return maybeError.success === false && typeof maybeError.message === 'string';
};

const parseApiErrorMessage = async (response: Response): Promise<ApiErrorMessage | null> => {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return null;

  try {
    const responseData = await response.clone().json();
    return isApiErrorMessage(responseData) ? responseData : null;
  } catch {
    return null;
  }
};

const errorInterceptor = async (error: KyHttpError): Promise<ExtendedKyHttpError> => {
  const responseData = await parseApiErrorMessage(error.response);
  if (!responseData) return error as ExtendedKyHttpError;

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

const SKIP_ACCESS_TOKEN_PATHS = ['/auth/oauth/kakao/web/login', '/auth/dev/signup-token'];

const api = ky.create({
  prefixUrl: getApiBaseUrl(),
  timeout: 5000,
  retry: 2,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    beforeRequest: [
      (request) => {
        const pathname = new URL(request.url).pathname;
        const shouldSkipAccessToken = SKIP_ACCESS_TOKEN_PATHS.some((p) => pathname.endsWith(p));
        if (shouldSkipAccessToken || request.headers.has('Authorization')) {
          logOnDev(`[API REQUEST] ${request.method} ${request.url}`);
          return;
        }

        for (const [key, value] of Object.entries(getAuthHeader())) {
          request.headers.set(key, value);
        }
        logOnDev(`[API REQUEST] ${request.method} ${request.url}`);
      },
    ],
    afterResponse: [
      async (req, _opt, res) => {
        logOnDev(`[API RESPONSE ${res.status}] ${req.method} ${req.url}`);
        if (res.ok) {
          const apiError = await parseApiErrorMessage(res);
          if (apiError) {
            throw new ApiResponseError(apiError);
          }
        }

        if (res.status === 401) {
          const pathname = new URL(req.url).pathname;
          const shouldSkip = SKIP_401_REDIRECT_PATHS.some((p) => pathname.endsWith(p));
          if (!shouldSkip) {
            clearAuthAndRedirectToLogin();
          }
        }
        return res;
      },
    ],
    beforeError: [errorInterceptor],
  },
});

export default api;
