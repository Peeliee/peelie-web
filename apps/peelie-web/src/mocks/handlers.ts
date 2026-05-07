import { aiChatHandlers } from './handlers/aiChatHandlers';
import { avatarStreamHandler } from './handlers/avatarStreamHandler';

export const handlers = [...aiChatHandlers, avatarStreamHandler];
