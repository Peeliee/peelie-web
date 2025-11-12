import { categoryHandlers } from './handlers/categoryHandlers';
import { onboardingHandlers } from './handlers/onboardingHandlers';
import { friendHandlers } from './handlers/friendHandlers';
import { userHandlers } from './handlers/userHandlers';

export const handlers = [
  ...categoryHandlers,
  ...onboardingHandlers,
  ...friendHandlers,
  ...userHandlers,
];
