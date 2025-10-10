import { HTTPError } from 'ky';
import { type ApiErrorCode } from '../constants/errorCode';

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorMessage {
  status: number;
  success: boolean;
  message: string;
  code: ApiErrorCode;
  reason: string;
}

export type KyHttpError = HTTPError<ApiErrorMessage>;

/** 호출부에서 errorData 로 바로 접근 가능하게 타입 확장 */
export type ExtendedKyHttpError = KyHttpError & {
  errorData: ApiErrorMessage;
};
