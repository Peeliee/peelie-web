import type { SSEEvent } from './types';

interface ParseResult {
  events: SSEEvent[];
  rest: string;
}

export function parseSSEChunk(buffer: string): ParseResult {
  const events: SSEEvent[] = [];
  const segments = buffer.split(/\r?\n\r?\n/);
  const rest = segments.pop() ?? '';

  for (const segment of segments) {
    const event = parseEventBlock(segment);
    if (event) events.push(event);
  }

  return { events, rest };
}

function parseEventBlock(block: string): SSEEvent | null {
  let event: string | undefined;
  let id: string | undefined;
  const dataLines: string[] = [];

  for (const rawLine of block.split(/\r?\n/)) {
    if (rawLine === '' || rawLine.startsWith(':')) continue;

    const colonIndex = rawLine.indexOf(':');
    const field = colonIndex === -1 ? rawLine : rawLine.slice(0, colonIndex);
    const value = colonIndex === -1 ? '' : stripLeadingSpace(rawLine.slice(colonIndex + 1));

    if (field === 'event') event = value;
    else if (field === 'data') dataLines.push(value);
    else if (field === 'id') id = value;
  }

  if (event === undefined && dataLines.length === 0) return null;

  return {
    event: event ?? 'message',
    data: dataLines.join('\n'),
    ...(id !== undefined && { id }),
  };
}

function stripLeadingSpace(value: string): string {
  return value.startsWith(' ') ? value.slice(1) : value;
}
