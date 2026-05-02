export interface SSEEvent {
  event: string;
  data: string;
  id?: string;
}

export interface SSEConnectionOptions {
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
  onEvent: (event: SSEEvent) => void;
}
