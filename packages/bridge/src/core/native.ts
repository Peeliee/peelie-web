import type { BridgeOptions } from "../define";
import type { Envelope } from "../envelope";
import { PROTOCOL_VERSION, isValidEnvelope } from "../envelope";
import { BridgeDisposedError } from "../errors";
import type { Transport } from "../transport/types";
import type {
    BridgeSchema,
    CommandKey,
    EventKey,
    PayloadOf,
    ReqOf,
    RequestKey,
    ResOf,
} from "../types";

type RequestHandler<Req, Res> = (payload: Req) => Res | Promise<Res>;
type CommandHandler<Req> = (payload: Req) => void | Promise<void>;

// .bind 인자 타입 — contract의 모든 request/command 키 강제.
// 누락 / 추가 / 시그니처 어긋남 모두 컴파일 에러.
// request는 응답 필요 → Res 강제. command는 응답 없음 → void 허용 (sync도, async도 OK).
export type Handlers<S extends BridgeSchema> = {
    [K in RequestKey<S>]: RequestHandler<ReqOf<S[K]>, ResOf<S[K]>>;
} & {
    [K in CommandKey<S>]: CommandHandler<ReqOf<S[K]>>;
};

export type NativeBridge<S extends BridgeSchema> = {
    emit<K extends EventKey<S>>(
        ...args: PayloadOf<S[K]> extends void ? [name: K] : [name: K, payload: PayloadOf<S[K]>]
    ): void;
    dispose(): void;
};

export type UnboundNativeBridge<S extends BridgeSchema> = {
    bind(handlers: Handlers<S>): NativeBridge<S>;
};

export function createNativeBridge<S extends BridgeSchema>(
    transport: Transport,
    _contract: S,
    options?: BridgeOptions,
): UnboundNativeBridge<S> {
    const logger = options?.logger;
    let handlers: Record<string, (payload: unknown) => unknown> | null = null;
    let disposed = false;

    const off = transport.onMessage((data) => {
        if (disposed) return;
        let parsed: unknown;
        try {
            parsed = JSON.parse(data);
        } catch {
            logger?.warn("[bridge:native] invalid JSON", data);
            return;
        }
        if (!isValidEnvelope(parsed)) {
            logger?.warn("[bridge:native] malformed envelope", parsed);
            return;
        }
        if (parsed.v !== PROTOCOL_VERSION) {
            logger?.warn("[bridge:native] unsupported protocolVersion", parsed.v);
            return;
        }
        void dispatch(parsed);
    });

    async function dispatch(envelope: Envelope): Promise<void> {
        switch (envelope.kind) {
            case "request": {
                const { id, name, payload } = envelope;
                const handler = handlers?.[name];
                if (!handler) {
                    transport.send(
                        JSON.stringify({
                            v: PROTOCOL_VERSION,
                            kind: "response",
                            id,
                            ok: false,
                            error: {
                                code: "UNKNOWN_MESSAGE",
                                message: `no handler for "${name}"`,
                            },
                        }),
                    );
                    return;
                }
                try {
                    const data = await handler(payload);
                    transport.send(
                        JSON.stringify({
                            v: PROTOCOL_VERSION,
                            kind: "response",
                            id,
                            ok: true,
                            data,
                        }),
                    );
                } catch (e) {
                    const err = e as { message?: string };
                    transport.send(
                        JSON.stringify({
                            v: PROTOCOL_VERSION,
                            kind: "response",
                            id,
                            ok: false,
                            error: {
                                code: "HANDLER_ERROR",
                                message: err?.message ?? "unknown error",
                            },
                        }),
                    );
                }
                return;
            }
            case "command": {
                const { name, payload } = envelope;
                const handler = handlers?.[name];
                if (!handler) {
                    logger?.warn("[bridge:native] unknown command", name);
                    return;
                }
                try {
                    await handler(payload);
                } catch (e) {
                    logger?.error("[bridge:native] command handler threw", name, e);
                }
                return;
            }
            case "response":
            case "event":
                logger?.warn("[bridge:native] received unexpected", envelope.kind);
                return;
        }
    }

    function doEmit(name: string, payload: unknown): void {
        if (disposed) throw new BridgeDisposedError();
        transport.send(
            JSON.stringify({
                v: PROTOCOL_VERSION,
                kind: "event",
                name,
                payload,
            }),
        );
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        handlers = null;
        off();
    }

    return {
        bind(boundHandlers: Handlers<S>): NativeBridge<S> {
            handlers = boundHandlers as unknown as Record<string, (payload: unknown) => unknown>;
            return {
                emit: ((...args: unknown[]) => {
                    const [name, payload] = args as [string, unknown?];
                    doEmit(name, payload);
                }) as NativeBridge<S>["emit"],
                dispose,
            };
        },
    };
}
