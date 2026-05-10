import type { BridgeOptions } from "../define";
import type { Envelope } from "../envelope";
import { PROTOCOL_VERSION, isValidEnvelope } from "../envelope";
import { BridgeDisposedError, BridgeHandlerError, BridgeTimeoutError } from "../errors";
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
import { SubscriberTable } from "./emitter";
import { createIdGenerator } from "./id";
import { PendingRequestTable } from "./pending";

const DEFAULT_TIMEOUT_MS = 30_000;

export type WebBridge<S extends BridgeSchema> = {
    request<K extends RequestKey<S>>(
        ...args: ReqOf<S[K]> extends void
            ? [name: K, payload?: undefined, opts?: { timeout?: number | "none" }]
            : [name: K, payload: ReqOf<S[K]>, opts?: { timeout?: number | "none" }]
    ): Promise<ResOf<S[K]>>;
    send<K extends CommandKey<S>>(
        ...args: ReqOf<S[K]> extends void ? [name: K] : [name: K, payload: ReqOf<S[K]>]
    ): void;
    on<K extends EventKey<S>>(name: K, handler: (payload: PayloadOf<S[K]>) => void): () => void;
    dispose(): void;
};

export function createWebBridge<S extends BridgeSchema>(
    transport: Transport,
    contract: S,
    options?: BridgeOptions,
): WebBridge<S> {
    const pending = new PendingRequestTable();
    const subscribers = new SubscriberTable();
    const nextId = createIdGenerator("r");
    const logger = options?.logger;
    const defaultTimeout = options?.defaultOptions?.request?.timeout ?? DEFAULT_TIMEOUT_MS;

    let disposed = false;

    const off = transport.onMessage((data) => {
        if (disposed) return;
        let parsed: unknown;
        try {
            parsed = JSON.parse(data);
        } catch {
            logger?.warn("[bridge:web] invalid JSON", data);
            return;
        }
        if (!isValidEnvelope(parsed)) {
            logger?.warn("[bridge:web] malformed envelope", parsed);
            return;
        }
        if (parsed.v !== PROTOCOL_VERSION) {
            logger?.warn("[bridge:web] unsupported protocolVersion", parsed.v);
            return;
        }
        dispatch(parsed);
    });

    function dispatch(envelope: Envelope): void {
        switch (envelope.kind) {
            case "response":
                pending.settle(envelope.id, (entry) => {
                    if (envelope.ok) entry.resolve(envelope.data);
                    else
                        entry.reject(
                            new BridgeHandlerError(envelope.error.code, envelope.error.message),
                        );
                });
                return;
            case "event":
                subscribers.emit(envelope.name, envelope.payload);
                return;
            case "request":
            case "command":
                logger?.warn("[bridge:web] received unexpected", envelope.kind);
                return;
        }
    }

    function doRequest(
        name: string,
        payload: unknown,
        opts: { timeout?: number | "none" } | undefined,
    ): Promise<unknown> {
        if (disposed) return Promise.reject(new BridgeDisposedError());
        const id = nextId();
        const def = contract[name as keyof S];
        const contractTimeout =
            def && def.kind === "request" && def.options?.timeout !== undefined
                ? def.options.timeout
                : undefined;
        const timeout = opts?.timeout ?? contractTimeout ?? defaultTimeout;
        return new Promise((resolve, reject) => {
            pending.add({
                id,
                resolve,
                reject,
                timeout,
                onTimeout: () => reject(new BridgeTimeoutError(id)),
            });
            transport.send(
                JSON.stringify({
                    v: PROTOCOL_VERSION,
                    kind: "request",
                    id,
                    name,
                    payload,
                }),
            );
        });
    }

    function doSend(name: string, payload: unknown): void {
        if (disposed) throw new BridgeDisposedError();
        transport.send(
            JSON.stringify({
                v: PROTOCOL_VERSION,
                kind: "command",
                name,
                payload,
            }),
        );
    }

    return {
        request: ((...args: unknown[]) => {
            const [name, payload, opts] = args as [
                string,
                unknown?,
                { timeout?: number | "none" }?,
            ];
            return doRequest(name, payload, opts);
        }) as WebBridge<S>["request"],
        send: ((...args: unknown[]) => {
            const [name, payload] = args as [string, unknown?];
            doSend(name, payload);
        }) as WebBridge<S>["send"],
        on: ((name: string, handler: (p: unknown) => void) =>
            subscribers.on(name, handler)) as WebBridge<S>["on"],
        dispose: () => {
            if (disposed) return;
            disposed = true;
            pending.rejectAll(new BridgeDisposedError());
            subscribers.clear();
            off();
        },
    };
}
