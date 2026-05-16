import { command, defineContract, event, request } from '@peelie/bridge';
import { z } from 'zod';

// 스모크 테스트용 contract — 실제 기능 연결 X.
// request / command / event 세 패턴 + payload void/non-void 조합을 한 번씩 커버.

const OkResponse = z.object({ ok: z.literal(true) });
const MessagePayload = z.object({ message: z.string() });
const TimeResponse = z.object({ now: z.number() });
const TickPayload = z.object({ count: z.number() });

export const testContract = defineContract({
  // request — 응답 받음
  PING: request({ response: OkResponse }), // void  → { ok: true }
  ECHO: request({ payload: MessagePayload, response: MessagePayload }), // round-trip
  GET_TIME: request({ response: TimeResponse }), // void  → { now }

  // command — 응답 없음 (web → native)
  LOG: command({ payload: MessagePayload }), // payload 있음
  TRIGGER: command(), // void

  // event — 자발적 발행 (native → web)
  TICK: event({ payload: TickPayload }), // payload 있음
  APP_READY: event(),
});

export type TestContract = typeof testContract;
