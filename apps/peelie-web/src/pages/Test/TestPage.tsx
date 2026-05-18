import { useState } from 'react';
import { toast } from 'sonner';
import { getBridgeErrorMessage, useBridge, useBridgeEvent } from '@/app/provider/BridgeProvider';
import { cn } from '@/shared/lib/utils';

// bridge smoke test page — request / command / event 세 패턴이 잘 도는지만 확인.
export default function TestPage() {
  const bridge = useBridge();
  const [pingResult, setPingResult] = useState<string>('—');
  const [echoResult, setEchoResult] = useState<string>('—');
  const [timeResult, setTimeResult] = useState<string>('—');
  const [logSent, setLogSent] = useState<number>(0);
  const [triggerSent, setTriggerSent] = useState<number>(0);
  const [tickCount, setTickCount] = useState<number | null>(null);
  const [appReady, setAppReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toastError = (label: string, e: unknown) => {
    const message = e instanceof Error ? e.message : String(e);
    toast.error(`[${label}] ${message}`);
  };

  useBridgeEvent('TICK', ({ count }) => setTickCount(count));
  useBridgeEvent('APP_READY', () => setAppReady(true));

  const handle = async <T,>(label: string, fn: () => Promise<T>, set: (v: string) => void) => {
    setError(null);
    try {
      const r = await fn();
      set(JSON.stringify(r));
    } catch (e) {
      setError(getBridgeErrorMessage(label, e));
      throw e;
    }
  };

  return (
    <div className={cn('flex min-h-screen flex-col gap-6 bg-amber-50', 'p-6 font-mono text-sm')}>
      <h1 className="text-xl font-bold">Bridge smoke test</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold">request (web → native, 응답 받음)</h2>
        <span>웹 → 네이티브: “살아있냐?”</span>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={async () => {
              try {
                await handle('PING', () => bridge.request('PING'), setPingResult);
              } catch (e) {
                toastError('PING', e);
              }
            }}
          >
            PING
          </button>
          <span>response: {pingResult}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={async () => {
              try {
                await handle(
                  'ECHO',
                  () => bridge.request('ECHO', { message: 'hello' }),
                  setEchoResult,
                );
              } catch (e) {
                toastError('ECHO', e);
              }
            }}
          >
            ECHO
          </button>
          <span>response: {echoResult}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={async () => {
              try {
                await handle('GET_TIME', () => bridge.request('GET_TIME'), setTimeResult);
              } catch (e) {
                toastError('GET_TIME', e);
              }
            }}
          >
            GET_TIME
          </button>
          <span>response: {timeResult}</span>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold">command (web → native, 응답 없음)</h2>
        <span>웹 → 네이티브: message: "tick-..." </span>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() => {
              try {
                bridge.send('LOG', { message: `tick-${Date.now()}` });
                setLogSent((n) => n + 1);
              } catch (e) {
                toastError('LOG', e);
              }
            }}
          >
            LOG
          </button>
          <span>sent: {logSent}회</span>
        </div>

        <br />

        <span>웹 → 네이티브: payload 없이 명령만 보냄 / 네이티브 콘솔에 [bridge:trigger] 찍음</span>
        <div className="flex items-center gap-2">
          <button
            className="rounded bg-black px-3 py-1 text-white"
            onClick={() => {
              try {
                bridge.send('TRIGGER');
                setTriggerSent((n) => n + 1);
              } catch (e) {
                toastError('TRIGGER', e);
              }
            }}
          >
            TRIGGER
          </button>
          <span>sent: {triggerSent}회</span>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold">event (native → web)</h2>
        <span>1초마다 한번씩 네이티브가 웹으로 틱 보냄</span>
        <div>TICK: {tickCount === null ? '대기 중…' : `count = ${tickCount}`}</div>
        <br />
        <span>네이티브가 이벤트를 보내면 웹에서 received로 바뀜</span>
        <div>APP_READY: {appReady ? 'received' : '대기 중…'}</div>
      </section>

      {error && <div className="rounded bg-red-100 p-2 text-red-800">{error}</div>}
    </div>
  );
}
