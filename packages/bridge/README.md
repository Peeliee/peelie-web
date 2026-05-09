# @peelie/bridge

WebView ↔ React Native 메시지 통신 라이브러리.

| 종류 | 방향 | 용도 |
|------|------|------|
| **request** | web → native | 응답 받음 (FCM 토큰, 로그인 등) |
| **command** | web → native | 응답 없음 (화면 이동 등) |
| **event** | native → web | 자발적 알림 (포그라운드, 카메라 결과 등) |

## 1. 계약(contract) 정의

웹과 네이티브가 같은 파일을 import.

```ts
// shared/bridge-contract.ts
import { defineContract, request, command, event } from '@peelie/bridge'

export const contract = defineContract({
  GET_FCM_TOKEN: request<void, { token: string }>(),
  KAKAO_LOGIN:   request<void, { accessToken: string; userId: string }>({ timeout: 'none' }),

  OPEN_CAMERA:    command<void>(),
  OPEN_INSTAGRAM: command<{ username: string }>(),

  APP_FOREGROUND: event<{ timestamp: number }>(),
  PHOTO_TAKEN:    event<{ uri: string }>(),
})
```

## 2. 웹 측

```ts
// app/bridge.ts
import { createWebBridge, webTransport } from '@peelie/bridge'
import { contract } from '@/shared/bridge-contract'

export const bridge = createWebBridge(webTransport(), contract)
```

```ts
const { token } = await bridge.request('GET_FCM_TOKEN')
bridge.send('OPEN_INSTAGRAM', { username: 'peelie' })

useEffect(() => bridge.on('PHOTO_TAKEN', ({ uri }) => upload(uri)), [])
```

페이로드가 `void`이면 인자를 생략합니다: `bridge.request('GET_FCM_TOKEN')`, `bridge.send('OPEN_CAMERA')`.

## 3. 네이티브 측

`.bind`에 contract의 모든 request/command 키를 적습니다.

```tsx
import { useRef, useMemo } from 'react'
import { WebView } from 'react-native-webview'
import { createNativeBridge, rnTransport } from '@peelie/bridge'
import { contract } from '@/shared/bridge-contract'

export default function App() {
  const ref = useRef<WebView>(null)
  const transport = useMemo(() => rnTransport(ref), [])

  const bridge = useMemo(
    () => createNativeBridge(transport, contract).bind({
      GET_FCM_TOKEN: async () => ({ token: await messaging().getToken() }),
      KAKAO_LOGIN:   async () => kakaoLogin(),
      OPEN_CAMERA:    () => router.push('/screen/CameraScreen'),
      OPEN_INSTAGRAM: ({ username }) =>
        Linking.openURL(`instagram://user?username=${username}`)
          .catch(() => Linking.openURL(`https://instagram.com/${username}`)),
    }),
    [transport],
  )

  return (
    <WebView
      ref={ref}
      source={{ uri: 'https://your-web.app' }}
      onMessage={(e) => transport.pushMessage(e.nativeEvent.data)}
    />
  )
}
```

이벤트 발행:

```ts
bridge.emit('PHOTO_TAKEN', { uri: photo.uri })

AppState.addEventListener('change', (s) => {
  if (s === 'active') bridge.emit('APP_FOREGROUND', { timestamp: Date.now() })
})
```

## 옵션

```ts
createWebBridge(webTransport(), contract, {
  defaultOptions: { request: { timeout: 30_000 } },   // 'none' 도 허용
  logger: import.meta.env.DEV ? console : undefined,
})
```

타임아웃은 호출 시점 > contract 정의 > 인스턴스 default 순으로 적용됩니다. 사용자 인터랙션 RPC(로그인/카메라)는 `'none'`이 안전합니다.

## 정리

```ts
bridge.dispose()   // WebView unmount 시
```