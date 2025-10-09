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

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL, // TODO: 추후 url 고치기
  credentials: 'include',
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
          // TODO: refresh token 처리 or 로그인 페이지 리다이렉트
          window.location.href = '/login';
        }
        return res;
      },
    ],
    beforeError: [errorInterceptor],
  },
});

export default api;
