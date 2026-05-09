// Minimal runtime metadata + phantom payload/response types.
// 각 factory는 { kind, options? } 객체를 반환. 페이로드 타입은 phantom 필드로 추론.

export type RequestDef<Req = unknown, Res = unknown> = {
  kind: 'request'
  options?: { timeout?: number | 'none' }
  __req?: Req
  __res?: Res
}

export type CommandDef<Req = unknown> = {
  kind: 'command'
  __req?: Req
}

export type EventDef<Payload = unknown> = {
  kind: 'event'
  __payload?: Payload
}

export type MessageDef = RequestDef | CommandDef | EventDef

export type BridgeSchema = Record<string, MessageDef>

// kind별 키 추출
export type RequestKey<S extends BridgeSchema> = {
  [K in keyof S]: S[K] extends RequestDef ? K : never
}[keyof S]

export type CommandKey<S extends BridgeSchema> = {
  [K in keyof S]: S[K] extends CommandDef ? K : never
}[keyof S]

export type EventKey<S extends BridgeSchema> = {
  [K in keyof S]: S[K] extends EventDef ? K : never
}[keyof S]

// 페이로드/응답 타입 추출 (phantom 필드 기반)
export type ReqOf<M> = M extends RequestDef<infer Req, infer _Res>
  ? Req
  : M extends CommandDef<infer Req>
    ? Req
    : never

export type ResOf<M> = M extends RequestDef<infer _Req, infer Res> ? Res : never

export type PayloadOf<M> = M extends EventDef<infer P> ? P : never
