import type { ChatBubble, ChatMessage, LocalTurn } from '../model';

export type RenderItem =
  | { kind: 'message'; message: ChatMessage; isLastAvatarTurn: boolean }
  | { kind: 'streaming-user'; text: string; createdAt: string }
  | { kind: 'streaming-avatar'; bubbles: ChatBubble[]; suggestions: string[]; createdAt: string };

export type StreamingState =
  | { kind: 'none' }
  | { kind: 'sending'; userMessage: string }
  | { kind: 'streaming'; userMessage: string; bubbles: ChatBubble[]; suggestions: string[] };

interface BuildArgs {
  initialMessages: ChatMessage[];
  greetingTurn: LocalTurn | null;
  history: LocalTurn[];
  streaming: StreamingState;
  /** "지금" 시각. 매 호출마다 새로 만들면 buildRenderItems 결과가 매 호출 달라져
   *  React 가 불필요한 리렌더 키 변경을 감지할 수 있어, 호출부에서 한 번만 만들어 넘긴다. */
  nowIso: string;
}

export function buildRenderItems({
  initialMessages,
  greetingTurn,
  history,
  streaming,
  nowIso,
}: BuildArgs): RenderItem[] {
  const flat: ChatMessage[] = [];

  flat.push(...initialMessages);

  if (greetingTurn && greetingTurn.kind === 'greeting') {
    flat.push({
      id: `greeting-${greetingTurn.completedAt}`,
      role: 'AVATAR',
      bubbles: greetingTurn.bubbles,
      suggestions: greetingTurn.suggestions,
      createdAt: greetingTurn.completedAt,
    });
  }

  history.forEach((turn, i) => {
    if (turn.kind === 'send') {
      flat.push({
        id: `hist-${i}-u`,
        role: 'USER',
        bubbles: [{ text: turn.userMessage, delayMs: 0 }],
        suggestions: [],
        createdAt: turn.completedAt,
      });
    }
    flat.push({
      id: `hist-${i}-a`,
      role: 'AVATAR',
      bubbles: turn.bubbles,
      suggestions: turn.suggestions,
      createdAt: turn.completedAt,
    });
  });

  // 마지막 AVATAR turn 위치 (suggestions 노출 대상). streaming 중이면 streaming-avatar 가 차지하므로 noop.
  let lastAvatarIdx = -1;
  for (let i = flat.length - 1; i >= 0; i--) {
    if (flat[i].role === 'AVATAR') {
      lastAvatarIdx = i;
      break;
    }
  }

  const items: RenderItem[] = flat.map((m, i) => ({
    kind: 'message',
    message: m,
    isLastAvatarTurn: i === lastAvatarIdx && streaming.kind === 'none',
  }));

  if (streaming.kind === 'sending' || streaming.kind === 'streaming') {
    items.push({ kind: 'streaming-user', text: streaming.userMessage, createdAt: nowIso });
  }
  if (streaming.kind === 'streaming') {
    items.push({
      kind: 'streaming-avatar',
      bubbles: streaming.bubbles,
      suggestions: streaming.suggestions,
      createdAt: nowIso,
    });
  }
  return items;
}

export function getRenderItemCreatedAt(item: RenderItem): string {
  switch (item.kind) {
    case 'message':
      return item.message.createdAt;
    case 'streaming-user':
    case 'streaming-avatar':
      return item.createdAt;
  }
}

export function getRenderItemKey(item: RenderItem, index: number): string {
  switch (item.kind) {
    case 'message':
      return item.message.id;
    case 'streaming-user':
      return `streaming-user-${index}`;
    case 'streaming-avatar':
      return `streaming-avatar-${index}`;
  }
}
