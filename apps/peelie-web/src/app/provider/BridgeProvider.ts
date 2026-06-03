import { BridgeValidationError } from 'webview-bridge-kit';
import { createBridgeClient } from 'webview-bridge-kit/react';
import { appContract } from '@/shared/lib/bridgeContract';
import { toast } from 'sonner';

export const { BridgeProvider, useBridge, useBridgeEvent } = createBridgeClient(appContract, {
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
