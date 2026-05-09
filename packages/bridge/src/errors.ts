export class BridgeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BridgeError'
  }
}

export class BridgeTimeoutError extends BridgeError {
  constructor(
    public readonly messageName: string,
    public readonly id: string,
  ) {
    super(`bridge request "${messageName}" (id=${id}) timed out`)
    this.name = 'BridgeTimeoutError'
  }
}

export class BridgeHandlerError extends BridgeError {
  constructor(
    public readonly messageName: string,
    public readonly code: string,
    message: string,
  ) {
    super(`bridge handler "${messageName}" failed: ${code} — ${message}`)
    this.name = 'BridgeHandlerError'
  }
}

export class BridgeDisposedError extends BridgeError {
  constructor() {
    super('bridge instance was disposed')
    this.name = 'BridgeDisposedError'
  }
}
