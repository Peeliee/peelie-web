export type PushTokenResult =
  | { status: 'granted'; token: string; platform: 'ios' | 'android' }
  | { status: 'denied' }
  | { status: 'unavailable'; reason: 'simulator' | 'no-apns' | 'unknown' };

export interface UpsertPushTokenRequest {
  token: string;
}
