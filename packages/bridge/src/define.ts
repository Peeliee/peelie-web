import type { BridgeSchema, CommandDef, EventDef, RequestDef } from "./types";

type RequestOptions = { timeout?: number | "none" };

// 각 factory는 minimal runtime metadata 객체를 반환.
// 페이로드/응답 타입은 phantom 필드로 정적 추론만 됨 (런타임 값 없음).

export function request<Req = void, Res = void>(options?: RequestOptions): RequestDef<Req, Res> {
    return options ? { kind: "request", options } : { kind: "request" };
}

export function command<Req = void>(): CommandDef<Req> {
    return { kind: "command" };
}

export function event<Payload = void>(): EventDef<Payload> {
    return { kind: "event" };
}

// defineContract: 입력을 그대로 반환. 제네릭 추론 통과를 위한 식별 함수.
export function defineContract<C extends BridgeSchema>(contract: C): C {
    return contract;
}

// 인스턴스 옵션 surface (timeout, logger 두 개로 한정 — §3.7.2).
export type Logger = {
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
};

export type BridgeOptions = {
    defaultOptions?: { request?: { timeout?: number | "none" } };
    logger?: Logger;
};
