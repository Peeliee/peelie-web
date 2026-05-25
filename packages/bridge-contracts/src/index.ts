import { command, defineContract, event, request } from '@peelie/bridge';
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

export const appContract = defineContract({
  APPLE_LOGIN: request({ response: AppleLoginResponse }),
  KAKAO_LOGIN: request({ response: KakaoLoginResponse }),
  LOG: command({ payload: LogPayload }),
  DEEP_LINK_INVITE: event({ payload: DeepLinkInvitePayload }),
});

export type AppContract = typeof appContract;
