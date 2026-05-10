import { useEffect, useMemo, useRef } from "react";
import { createWebBridge } from "./core/web";
import type { WebBridge } from "./core/web";
import type { BridgeOptions } from "./define";
import { webTransport } from "./transport/web-transport";
import type { BridgeSchema } from "./types";

// React 컴포넌트 내부에서 web bridge를 안전하게 만들기 위한 hook.
// bridge를 useMemo로 고정하고 unmount 시 자동 dispose한다.
//
// `options`는 첫 렌더 값으로 고정된다. 변경이 필요하면 hook 호출부에서 key를 바꿔
// 컴포넌트를 remount하거나 core API로 직접 생명주기를 제어한다.
export function useWebBridge<S extends BridgeSchema>(
    contract: S,
    options?: BridgeOptions,
): WebBridge<S> {
    const optionsRef = useRef(options);

    const bridge = useMemo(
        () => createWebBridge(webTransport(), contract, optionsRef.current),
        [contract],
    );

    useEffect(() => () => bridge.dispose(), [bridge]);

    return bridge;
}
