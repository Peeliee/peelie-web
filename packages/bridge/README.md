# @peelie/bridge

WebView ↔ React Native 메시지 통신 라이브러리.

| 종류        | 방향         | 용도                                     |
| ----------- | ------------ | ---------------------------------------- |
| **request** | web → native | 응답 받음 (FCM 토큰, 로그인 등)          |
| **command** | web → native | 응답 없음 (화면 이동 등)                 |
| **event**   | native → web | 자발적 알림 (포그라운드, 카메라 결과 등) |

## 1. 계약(contract) 정의

웹과 네이티브가 같은 파일을 import. schema를 넣으면 타입이 schema에서 추론되고 런타임 검증도 됩니다.
schema가 없으면 payload/response는 `void`입니다.

```ts
// shared/bridge-contract.ts
import { z } from "zod";
import { defineContract, request, command, event } from "@peelie/bridge";

const TokenSchema = z.object({ token: z.string() });
const KakaoLoginSchema = z.object({ accessToken: z.string(), userId: z.string() });
const UsernameSchema = z.object({ username: z.string() });
const TimestampSchema = z.object({ timestamp: z.number() });
const UriSchema = z.object({ uri: z.string() });

export const contract = defineContract({
    GET_FCM_TOKEN: request({ response: TokenSchema }),
    KAKAO_LOGIN: request({ response: KakaoLoginSchema, timeout: "none" }),
    PING: request(),

    OPEN_CAMERA: command(),
    OPEN_INSTAGRAM: command({ payload: UsernameSchema }),

    APP_FOREGROUND: event(),
    APP_RESUME: event({ payload: TimestampSchema }),
    PHOTO_TAKEN: event({ payload: UriSchema }),
});
```

schema는 `parse(value: unknown): T` 메서드를 가진 객체면 됩니다.

## 2. 웹 측

```ts
// app/bridge.ts
import { createWebBridge, webTransport } from "@peelie/bridge";
import { contract } from "@/shared/bridge-contract";

export const bridge = createWebBridge(webTransport(), contract);
```

```ts
const { token } = await bridge.request("GET_FCM_TOKEN");
bridge.send("OPEN_INSTAGRAM", { username: "peelie" });

useEffect(() => bridge.on("PHOTO_TAKEN", ({ uri }) => upload(uri)), []);
```

페이로드가 `void`이면 인자를 생략합니다: `bridge.request('GET_FCM_TOKEN')`, `bridge.send('OPEN_CAMERA')`.

## 3. 네이티브 측

`.bind`에 contract의 모든 request/command 키를 적습니다.

```tsx
import { useRef, useMemo } from "react";
import { WebView } from "react-native-webview";
import { createNativeBridge, rnTransport } from "@peelie/bridge";
import { contract } from "@/shared/bridge-contract";

export default function App() {
    const ref = useRef<WebView>(null);
    const transport = useMemo(() => rnTransport(ref), []);

    const bridge = useMemo(
        () =>
            createNativeBridge(transport, contract).bind({
                GET_FCM_TOKEN: async () => ({ token: await messaging().getToken() }),
                KAKAO_LOGIN: async () => kakaoLogin(),
                PING: () => {},
                OPEN_CAMERA: () => router.push("/screen/CameraScreen"),
                OPEN_INSTAGRAM: ({ username }) =>
                    Linking.openURL(`instagram://user?username=${username}`).catch(() =>
                        Linking.openURL(`https://instagram.com/${username}`),
                    ),
            }),
        [transport],
    );

    return (
        <WebView
            ref={ref}
            source={{ uri: "https://your-web.app" }}
            onMessage={(e) => transport.pushMessage(e.nativeEvent.data)}
        />
    );
}
```

이벤트 발행:

```ts
bridge.emit("PHOTO_TAKEN", { uri: photo.uri });

AppState.addEventListener("change", (s) => {
    if (s === "active") bridge.emit("APP_FOREGROUND");
});
```

## 옵션

```ts
createWebBridge(webTransport(), contract, {
    defaultOptions: { request: { timeout: 30_000 } }, // 'none' 도 허용
    logger: import.meta.env.DEV ? console : undefined,
});
```

타임아웃은 호출 시점 > contract 정의 > 인스턴스 default 순으로 적용됩니다. 사용자 인터랙션 RPC(로그인/카메라)는 `'none'`이 안전합니다.

## 검증

schema가 붙은 자리는 양방향(나가는/들어오는) 모두 런타임 검증됩니다. 실패 시:

- 나가는 쪽 → `BridgeValidationError` throw / Promise reject
- 들어오는 request → 보낸 쪽으로 `BridgeValidationError` reject
- 들어오는 command/event → drop + `logger.warn`

schema의 `parse`는 여러 번 호출되어도 같은 결과를 내도록 작성하는 것이 좋습니다.

## 에러 처리

```ts
import {
    BridgeDisposedError,
    BridgeHandlerError,
    BridgeTimeoutError,
    BridgeValidationError,
} from "@peelie/bridge";

try {
    await bridge.request("GET_FCM_TOKEN");
} catch (e) {
    if (e instanceof BridgeTimeoutError) {
        // request timeout
    }
    if (e instanceof BridgeValidationError) {
        // schema 검증 실패
    }
    if (e instanceof BridgeHandlerError) {
        // native handler 에러 응답
    }
    if (e instanceof BridgeDisposedError) {
        // dispose 이후 사용 또는 pending request 정리
    }
}
```

## 정리

`dispose()`는 WebView가 unmount되거나 bridge 인스턴스를 교체할 때 호출합니다.
호출하면 message listener를 제거하고, 대기 중인 request를 `BridgeDisposedError`로 reject하며, event 구독을 정리합니다.

```ts
bridge.dispose();
```
