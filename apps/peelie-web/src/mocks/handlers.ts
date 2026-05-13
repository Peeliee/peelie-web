import { chatroomHandlers } from './handlers/chatroomHandlers';
import { chatStreamHandlers } from './handlers/chatStreamHandler';

export const handlers = [...chatroomHandlers, ...chatStreamHandlers];
