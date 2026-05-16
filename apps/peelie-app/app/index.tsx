import { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Platform } from 'react-native';
import type { BridgeOptions } from '@peelie/bridge';
import { useNativeBridge } from '@peelie/bridge/react-native';
import { testContract } from '@peelie/bridge-contracts';

const bridgeOptions = {
  logger: console,
} satisfies BridgeOptions;

export default function HomeScreen() {
  const ref = useRef<WebView>(null);

  const DEV_URL = 'http://172.20.10.11:5173/test';
  const PROD_URL = 'https://peelie.vercel.app';
  const sourceUrl = __DEV__ ? DEV_URL : PROD_URL;

  const insets = useSafeAreaInsets();

  const injectedJavaScript = `
        window.safeAreaInsets = {
            top: ${insets.top},
            bottom: ${insets.bottom},
            left: ${insets.left},
            right: ${insets.right}
        };
        true;
    `;

  const { bridge, pushMessage } = useNativeBridge(
    ref,
    testContract,
    {
      PING: () => ({ ok: true as const }),
      ECHO: ({ message }) => ({ message: String(Date.now() + message + '응답임') }),
      GET_TIME: () => ({ now: Date.now() }),
      LOG: ({ message }) => {
        console.log('[bridge:log]', message);
      },
      TRIGGER: () => {
        console.log('[bridge:trigger]');
      },
    },
    bridgeOptions,
  );

  useEffect(() => {
    let count = 0;
    const tick = setInterval(() => {
      count += 1;
      bridge.emit('TICK', { count });
      if (count <= 5) bridge.emit('APP_READY');
    }, 1000);
    return () => clearInterval(tick);
  }, [bridge]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingBottom: Platform.OS === 'ios' ? -20 : 0,
          },
        ]}
      >
        <WebView
          ref={ref}
          source={{ uri: sourceUrl }}
          originWhitelist={['*']}
          allowsInlineMediaPlayback
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          style={{ flex: 1 }}
          onLoadStart={() => console.log('WebView 시작')}
          onLoadEnd={() => console.log('WebView 완료')}
          onError={(e) => console.log('WebView 오류:', e.nativeEvent)}
          onMessage={(e) => pushMessage(e.nativeEvent.data)}
          injectedJavaScript={injectedJavaScript}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
