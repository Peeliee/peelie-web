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

컴포넌트 밖에서 한 번 만들 수 있으면 싱글톤으로 사용합니다.

```ts
// app/bridge.ts
import { createWebBridge, webTransport } from "@peelie/bridge";
import { contract } from "@/shared/bridge-contract";

export const bridge = createWebBridge(webTransport(), contract);
```

컴포넌트 안에서 만들어야 한다면 `useWebBridge` hook을 사용합니다. bridge 인스턴스 고정과 unmount 시 자동 dispose가 처리됩니다.

```tsx
import { useWebBridge } from "@peelie/bridge/react";
import { contract } from "@/shared/bridge-contract";

export function CameraButton() {
    const bridge = useWebBridge(contract);

    return <button onClick={() => bridge.send("OPEN_CAMERA")}>Open camera</button>;
}
```

```ts
const { token } = await bridge.request("GET_FCM_TOKEN");
bridge.send("OPEN_INSTAGRAM", { username: "peelie" });

useEffect(() => bridge.on("PHOTO_TAKEN", ({ uri }) => upload(uri)), []);
```

페이로드가 `void`이면 인자를 생략합니다: `bridge.request('GET_FCM_TOKEN')`, `bridge.send('OPEN_CAMERA')`.

## 3. 네이티브 측

`useNativeBridge` hook을 쓰면 transport/bridge 인스턴스 고정 + unmount 시 자동 dispose가 처리됩니다.

```tsx
import { useRef } from "react";
import { WebView } from "react-native-webview";
import { useNativeBridge } from "@peelie/bridge/react-native";
import { contract } from "@/shared/bridge-contract";

export default function App() {
    const ref = useRef<WebView>(null);
    const { bridge, pushMessage } = useNativeBridge(ref, contract, {
        GET_FCM_TOKEN: async () => ({ token: await messaging().getToken() }),
        KAKAO_LOGIN: async () => kakaoLogin(),
        PING: () => {},
        OPEN_CAMERA: () => router.push("/screen/CameraScreen"),
        OPEN_INSTAGRAM: ({ username }) =>
            Linking.openURL(`instagram://user?username=${username}`).catch(() =>
                Linking.openURL(`https://instagram.com/${username}`),
            ),
    });

    return (
        <WebView
            ref={ref}
            source={{ uri: "https://your-web.app" }}
            onMessage={(e) => pushMessage(e.nativeEvent.data)}
        />
    );
}
```

`pushMessage`는 WebView의 `onMessage`로 받은 raw string을 bridge에 전달합니다. 이 줄이 없으면 web → native 메시지가 native handler까지 도달하지 않습니다.

이벤트 발행:

```ts
bridge.emit("PHOTO_TAKEN", { uri: photo.uri });

AppState.addEventListener("change", (s) => {
    if (s === "active") bridge.emit("APP_FOREGROUND");
});
```

> hook을 안 쓰고 직접 만들고 싶으면 `createNativeBridge` + `rnTransport`를 import해서 직접 생명주기를 관리합니다.

## 옵션

options는 `createWebBridge`, `createNativeBridge`, `useWebBridge`, `useNativeBridge`에서 같은 모양을 사용합니다.

```ts
createWebBridge(webTransport(), contract, {
    defaultOptions: { request: { timeout: 30_000 } }, // 'none' 도 허용
    logger: import.meta.env.DEV ? console : undefined,
});
```

hook에서는 마지막 인자로 넣습니다.

```tsx
const bridge = useWebBridge(contract, {
    logger: console,
    defaultOptions: {
        request: {
            timeout: 30_000,
        },
    },
});
```

```tsx
const { bridge, pushMessage } = useNativeBridge(ref, contract, handlers, {
    logger: console,
    defaultOptions: {
        request: {
            timeout: 30_000,
        },
    },
});
```

타임아웃은 호출 시점 > contract 정의 > 인스턴스 default 순으로 적용됩니다. 사용자 인터랙션 RPC(로그인/카메라)는 `'none'`을 쓸 수 있습니다.

hook에서 넘긴 options는 첫 렌더 값으로 고정됩니다. 렌더 중 options 객체가 바뀌어도 bridge는 다시 만들어지지 않습니다.

### logger

`logger`는 브릿지가 내부에서 경고/에러를 기록할 때 쓰는 객체입니다. 보통 개발 중에는 `console`을 넣으면 됩니다.

```ts
useWebBridge(contract, { logger: console });
useNativeBridge(ref, contract, handlers, { logger: console });
```

`logger`가 잡는 것은 "내가 호출한 API의 실패"가 아니라, 브릿지가 메시지를 처리하다가 버리는 상황입니다.

예:

- 깨진 JSON이 들어옴
- 지원하지 않는 protocol version이 들어옴
- contract에 없는 command/event가 들어오거나 나가려고 함
- command/event payload가 schema와 맞지 않아 drop됨
- native command handler가 내부에서 throw함

직접 호출한 request 실패는 `logger`가 아니라 `try/catch`로 처리합니다. native에 bind한 request handler가 throw하면 web에서는 `BridgeHandlerError`로 받습니다.

```ts
try {
    await bridge.request("GET_FCM_TOKEN");
} catch (e) {
    // timeout, validation, unknown request 등
}
```

`bridge.send()`나 `bridge.emit()`에서 payload schema 검증이 실패하면 코드 버그로 보고 즉시 throw합니다. listener나 timer 안에서 호출한다면 필요할 때 `try/catch`로 감싸세요. contract에 없는 command/event는 throw하지 않고 `logger.warn` 후 버립니다.

## 검증

schema가 붙은 자리는 양방향(나가는/들어오는) 모두 런타임 검증됩니다. 실패 시:

| 상황                         | request                              | command/event                 |
| ---------------------------- | ------------------------------------ | ----------------------------- |
| contract에 없는 이름 호출    | `BridgeUnknownMessageError` reject   | drop + `logger.warn`          |
| 내가 보낸 값이 schema와 다름 | `BridgeValidationError` reject       | `BridgeValidationError` throw |
| 상대가 잘못 보낸 메시지      | 응답 에러로 돌려주고 caller가 reject | drop + `logger.warn`          |

schema는 같은 입력에 같은 출력을 내도록 작성하세요. 시간/랜덤값이 섞인 transform은 피하는 것이 안전합니다.

## 에러 처리

```ts
import {
    BridgeDisposedError,
    BridgeHandlerError,
    BridgeTimeoutError,
    BridgeUnknownMessageError,
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
    if (e instanceof BridgeUnknownMessageError) {
        // contract에 없는 request 또는 native UNKNOWN_MESSAGE 응답
    }
    if (e instanceof BridgeHandlerError) {
        // native에 bind한 request handler가 throw한 경우
    }
    if (e instanceof BridgeDisposedError) {
        // dispose 이후 사용 또는 pending request 정리
    }
}
```

## 정리

hook을 쓰면 unmount 시 자동으로 정리됩니다. 직접 `createWebBridge`/`createNativeBridge`를 쓴 경우에만 `dispose()`를 호출하세요.
`dispose()`는 message listener를 제거하고, 대기 중인 request를 `BridgeDisposedError`로 reject하며, event 구독을 정리합니다.

```ts
bridge.dispose();
```
