export class BridgeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BridgeError'
  }
}

export class BridgeTimeoutError extends BridgeError {
  constructor(public readonly id: string) {
    super(`bridge request (id=${id}) timed out`)
    this.name = 'BridgeTimeoutError'
  }
}

export class BridgeHandlerError extends BridgeError {
  constructor(
    public readonly code: string,
    public readonly detail: string,
  ) {
    super(`bridge handler failed: ${code} — ${detail}`)
    this.name = 'BridgeHandlerError'
  }
}

export class BridgeDisposedError extends BridgeError {
  constructor() {
    super('bridge instance was disposed')
    this.name = 'BridgeDisposedError'
  }
}
