import { useEffect } from 'react';

import { initConsoleBridge } from '@/shared/lib/initConsoleBridge';

import { useBridge } from './BridgeProvider';

export default function ConsoleBridge() {
  const bridge = useBridge();

  useEffect(() => {
    return initConsoleBridge((level, args) => {
      bridge.send('LOG', { level, args });
    });
  }, [bridge]);

  return null;
}
