import { command, defineContract, request } from '@peelie/bridge';
import { z } from 'zod';

const AppleLoginResponse = z.object({
  authorizationCode: z.string(),
});

const LogPayload = z.object({
  level: z.enum(['log', 'info', 'warn', 'error', 'debug']),
  args: z.array(z.string()),
});

export const appContract = defineContract({
  APPLE_LOGIN: request({ response: AppleLoginResponse }),
  LOG: command({ payload: LogPayload }),
});

export type AppContract = typeof appContract;
