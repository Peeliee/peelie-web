import { useEffect } from 'react';

import { useBridge } from '@/app/provider/BridgeProvider';
import { isInWebView } from '@/shared/lib/isInWebView';

import { useUpsertPushTokenMutation } from './useUpsertPushTokenMutation';

interface UseFcmTokenSyncOptions {
  enabled: boolean;
}

export const useFcmTokenSync = ({ enabled }: UseFcmTokenSyncOptions) => {
  const bridge = useBridge();
  const { mutate: upsertToken } = useUpsertPushTokenMutation();

  useEffect(() => {
    if (!enabled) return;
    if (!isInWebView()) return;

    const sync = async () => {
      try {
        const result = await bridge.request('GET_PUSH_TOKEN', undefined, {
          timeout: 'none',
        });
        if (result.status !== 'granted') {
          console.log('[fcm-sync] skip:', result);
          return;
        }
        upsertToken({ token: result.token });
      } catch (error) {
        console.log('[fcm-sync] failed:', error);
      }
    };

    void sync();
  }, [enabled, bridge, upsertToken]);
};
