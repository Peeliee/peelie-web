import { useEffect, useState } from 'react';
import { useWebBridge } from '@peelie/bridge/react';
import { testContract } from '@peelie/bridge-contracts';
import { BridgeValidationError } from '@peelie/bridge';

// bridge smoke test page — request / command / event 세 패턴이 잘 도는지만 확인.
export default function TestPage() {
  const bridge = useWebBridge(testContract);

  const [pingResult, setPingResult] = useState<string>('—');
  const [echoResult, setEchoResult] = useState<string>('—');
  const [timeResult, setTimeResult] = useState<string>('—');
  const [logSent, setLogSent] = useState<number>(0);
  const [triggerSent, setTriggerSent] = useState<number>(0);
  const [tickCount, setTickCount] = useState<number | null>(null);
  const [appReady, setAppReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const offTick = bridge.on('TICK', ({ count }) => setTickCount(count));
    const offReady = bridge.on('APP_READY', () => setAppReady(true));
    return () => {
      offTick();
      offReady();
    };
  }, [bridge]);

  const handle = async <T,>(label: string, fn: () => Promise<T>, set: (v: string) => void) => {
    setError(null);
    try {
      const r = await fn();
      set(JSON.stringify(r));
    } catch (e) {
      if (e instanceof BridgeValidationError) {
        setError(`[${label}] validation: ${e.message}`);
      } else if (e instanceof Error) {
        setError(`[${label}] ${e.name}: ${e.message}`);
      } else {
        setError(`[${label}] ${String(e)}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-amber-50 p-6 font-mono text-sm">
      <h1 className="text-xl font-bold">Bridge smoke test</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold">request (web → native, 응답 받음)</h2>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() => handle('PING', () => bridge.request('PING'), setPingResult)}
          >
            PING
          </button>
          <span>response: {pingResult}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() =>
              handle('ECHO', () => bridge.request('ECHO', { message: 'hello' }), setEchoResult)
            }
          >
            ECHO
          </button>
          <span>response: {echoResult}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() => handle('GET_TIME', () => bridge.request('GET_TIME'), setTimeResult)}
          >
            GET_TIME
          </button>
          <span>response: {timeResult}</span>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold">command (web → native, 응답 없음)</h2>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() => {
              bridge.send('LOG', { message: `tick-${Date.now()}` });
              setLogSent((n) => n + 1);
            }}
          >
            LOG
          </button>
          <span>sent: {logSent}회</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() => {
              bridge.send('TRIGGER');
              setTriggerSent((n) => n + 1);
            }}
          >
            TRIGGER
          </button>
          <span>sent: {triggerSent}회</span>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold">event (native → web)</h2>
        <div>TICK: {tickCount === null ? '대기 중…' : `count = ${tickCount}`}</div>
        <div>APP_READY: {appReady ? 'received' : '대기 중…'}</div>
      </section>

      {error && <div className="rounded bg-red-100 p-2 text-red-800">{error}</div>}
    </div>
  );
}
