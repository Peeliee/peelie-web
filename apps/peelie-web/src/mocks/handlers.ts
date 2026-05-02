import { categoryHandlers } from './handlers/categoryHandlers';
import { onboardingHandlers } from './handlers/onboardingHandlers';
import { friendHandlers } from './handlers/friendHandlers';
import { userHandlers } from './handlers/userHandlers';
import { quizHandlers } from './handlers/quizHandlers';
import { aiChatHandlers } from './handlers/aiChatHandlers';

export const handlers = [
  ...categoryHandlers,
  ...onboardingHandlers,
  ...friendHandlers,
  ...userHandlers,
  ...quizHandlers,
  ...aiChatHandlers,
];
