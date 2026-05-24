import { isInWebView } from './isInWebView';

const LEVELS = ['log', 'info', 'warn', 'error', 'debug'] as const;
type Level = (typeof LEVELS)[number];

function serializeArg(arg: unknown): string {
  if (arg instanceof Error) {
    return `${arg.name}: ${arg.message}${arg.stack ? `\n${arg.stack}` : ''}`;
  }
  if (typeof arg === 'string') return arg;
  if (
    typeof arg === 'number' ||
    typeof arg === 'boolean' ||
    arg === null ||
    arg === undefined
  ) {
    return String(arg);
  }
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

export type ConsoleBridgeSender = (level: Level, args: string[]) => void;

export function initConsoleBridge(send: ConsoleBridgeSender): () => void {
  if (!isInWebView()) return () => {};

  const originals = {} as Record<Level, (...args: unknown[]) => void>;
  LEVELS.forEach((level) => {
    originals[level] = console[level].bind(console);
    console[level] = (...args: unknown[]) => {
      originals[level](...args);
      try {
        send(level, args.map(serializeArg));
      } catch {
        // 로깅이 앱을 깨뜨리지 않도록 swallow
      }
    };
  });

  return () => {
    LEVELS.forEach((level) => {
      console[level] = originals[level];
    });
  };
}
