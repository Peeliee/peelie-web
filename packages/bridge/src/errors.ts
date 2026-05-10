export class BridgeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BridgeError";
    }
}

export class BridgeTimeoutError extends BridgeError {
    constructor(public readonly id: string) {
        super(`bridge request (id=${id}) timed out`);
        this.name = "BridgeTimeoutError";
    }
}

export class BridgeHandlerError extends BridgeError {
    constructor(
        public readonly code: string,
        public readonly detail: string,
    ) {
        super(`bridge handler failed: ${code} — ${detail}`);
        this.name = "BridgeHandlerError";
    }
}

export class BridgeDisposedError extends BridgeError {
    constructor() {
        super("bridge instance was disposed");
        this.name = "BridgeDisposedError";
    }
}

// schema.parse 실패 시 발생. cause에 원본 검증기 에러(예: ZodError)가 담김.
// caller가 instanceof로 timeout 등과 구분 가능 — 검증 실패는 재시도 무의미.
export class BridgeValidationError extends BridgeError {
    constructor(
        message: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = "BridgeValidationError";
    }
}
