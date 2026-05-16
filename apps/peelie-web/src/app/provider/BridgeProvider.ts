import { BridgeValidationError } from '@peelie/bridge';
import { createBridgeClient } from '@peelie/bridge/react';
import { testContract } from '@peelie/bridge-contracts';
import { toast } from 'sonner';

export const { BridgeProvider, useBridge, useBridgeEvent } = createBridgeClient(testContract, {
  logger: {
    warn: (...args) => toast.warning(args.map(String).join(' ')),
    error: (...args) => toast.warning(args.map(String).join(' ')),
    debug: (...args) => toast.error(args.map(String).join(' ')),
    info: (...args) => toast.error(args.map(String).join(' ')),
  },
  defaultOptions: {
    request: {
      timeout: 3_000,
    },
  },
});

export function getBridgeErrorMessage(label: string, e: unknown): string {
  if (e instanceof BridgeValidationError) {
    return `[${label}] validation: ${e.message}`;
  }
  if (e instanceof Error) {
    return `[${label}] ${e.name}: ${e.message}`;
  }
  return `[${label}] ${String(e)}`;
}
