import { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import type { BridgeOptions } from '@peelie/bridge';
import { useNativeBridge } from '@peelie/bridge/react-native';
import { appContract } from '@peelie/bridge-contracts';

const bridgeOptions = {
  logger: console,
} satisfies BridgeOptions;

export default function HomeScreen() {
  const ref = useRef<WebView>(null);

  const DEV_URL = 'http://192.168.1.16:5173';
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

  const { pushMessage } = useNativeBridge(
    ref,
    appContract,
    {
      LOG: ({ level, args }) => {
        const fn = console[level] ?? console.log;
        fn('[web]', ...args);
      },
      APPLE_LOGIN: async () => {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        if (!credential.authorizationCode) {
          throw new Error('Apple authorizationCode 없음');
        }
        console.log(credential.authorizationCode);
        return { authorizationCode: credential.authorizationCode };
      },
      KAKAO_LOGIN: async () => {
        const token = await kakaoLogin();
        return { accessToken: token.accessToken };
      },
    },
    bridgeOptions,
  );

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
