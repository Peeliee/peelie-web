import { command, defineContract } from '@peelie/bridge';
import { z } from 'zod';

const LogPayload = z.object({
  level: z.enum(['log', 'info', 'warn', 'error', 'debug']),
  args: z.array(z.string()),
});

export const appContract = defineContract({
  LOG: command({ payload: LogPayload }),
});

export type AppContract = typeof appContract;
