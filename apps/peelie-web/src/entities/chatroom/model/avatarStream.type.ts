export type AvatarStreamEvent =
  | { type: 'meta'; roomId: string; userId: string; friendId: string }
  | { type: 'delta'; content: string }
  | { type: 'done'; roomId: string; answer: string }
  | { type: 'error'; message: string };
