import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Linking from 'expo-linking';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import messaging from '@react-native-firebase/messaging';
import type { BridgeOptions } from 'webview-bridge-kit';
import { useNativeBridge } from 'webview-bridge-kit/react-native';
import { appContract } from './bridgeContract';

const bridgeOptions = {
  logger: console,
} satisfies BridgeOptions;

const EXTERNAL_SCHEME_PREFIXES = ['kakaotalk://', 'kakaolink://', 'intent://', 'peelieapp://'];

export default function HomeScreen() {
  const ref = useRef<WebView>(null);

  const DEV_URL = 'http://192.168.1.61:5173';
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
      GET_PUSH_TOKEN: async () => {
        const authStatus = await messaging().requestPermission();
        const granted =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (!granted) return { status: 'denied' as const };

        try {
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          if (!token) {
            return { status: 'unavailable' as const, reason: 'no-apns' as const };
          }
          const platform = Platform.OS === 'ios' ? ('ios' as const) : ('android' as const);
          return { status: 'granted' as const, token, platform };
        } catch (error) {
          console.log('[FCM] getToken failed:', error);
          return { status: 'unavailable' as const, reason: 'unknown' as const };
        }
      },
    },
    bridgeOptions,
  );

  const url = Linking.useURL();
  const [webReady, setWebReady] = useState(false);

  useEffect(() => {
    console.log('[deeplink] url =', url, 'webReady =', webReady);
    if (!webReady || !url) return;
    const parsed = Linking.parse(url);
    const code = parsed.queryParams?.code;
    if (typeof code !== 'string') {
      console.log('[deeplink] no code in queryParams');
      return;
    }
    // Wait for React mount (AuthGate → SsgoiLayout → useBridgeEvent register)
    const t = setTimeout(() => {
      console.log('[deeplink] emitting DEEP_LINK_INVITE with code =', code);
      bridge.emit('DEEP_LINK_INVITE', { code });
    }, 800);
    return () => clearTimeout(t);
  }, [url, bridge, webReady]);

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
        onLoadEnd={() => {
          console.log('WebView 완료');
          setWebReady(true);
        }}
        onError={(e) => console.log('WebView 오류:', e.nativeEvent)}
        onMessage={(e) => pushMessage(e.nativeEvent.data)}
        injectedJavaScript={injectedJavaScript}
        onShouldStartLoadWithRequest={(req) => {
          if (EXTERNAL_SCHEME_PREFIXES.some((s) => req.url.startsWith(s))) {
            Linking.openURL(req.url).catch(() => {});
            return false;
          }
          return true;
        }}
      />
    </SafeAreaProvider>
  );
}
