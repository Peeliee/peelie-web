import { command, defineContract, event, request } from 'webview-bridge-kit';
import { z } from 'zod';

const AppleLoginResponse = z.object({
  authorizationCode: z.string(),
});

const KakaoLoginResponse = z.object({
  accessToken: z.string(),
});

const LogPayload = z.object({
  level: z.enum(['log', 'info', 'warn', 'error', 'debug']),
  args: z.array(z.string()),
});

const DeepLinkInvitePayload = z.object({
  code: z.string(),
});

const PushTokenResponse = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('granted'),
    token: z.string(),
    platform: z.enum(['ios', 'android']),
  }),
  z.object({ status: z.literal('denied') }),
  z.object({
    status: z.literal('unavailable'),
    reason: z.enum(['simulator', 'no-apns', 'unknown']),
  }),
]);

export const appContract = defineContract({
  APPLE_LOGIN: request({ response: AppleLoginResponse }),
  KAKAO_LOGIN: request({ response: KakaoLoginResponse }),
  GET_PUSH_TOKEN: request({ response: PushTokenResponse }),
  LOG: command({ payload: LogPayload }),
  DEEP_LINK_INVITE: event({ payload: DeepLinkInvitePayload }),
});

export type AppContract = typeof appContract;
