import { parseSSEChunk } from './parseSSEChunk';
import type { SSEConnectionOptions } from './types';

export async function openSSEConnection(options: SSEConnectionOptions): Promise<void> {
  const { url, method = 'GET', headers, body, signal, onEvent } = options;

  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'text/event-stream',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    throw new Error(`SSE request failed. status=${response.status}`);
  }

  if (!response.body) {
    throw new Error('SSE response has no body.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const { events, rest } = parseSSEChunk(buffer);
      buffer = rest;

      for (const event of events) onEvent(event);
    }

    buffer += decoder.decode();
    if (buffer.length > 0) {
      const { events } = parseSSEChunk(buffer + '\n\n');
      for (const event of events) onEvent(event);
    }
  } finally {
    reader.releaseLock();
  }
}
