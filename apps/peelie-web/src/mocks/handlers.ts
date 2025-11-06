import { categoryHandlers } from './handlers/categoryHandlers';
import { onboardingHandlers } from './handlers/onboardingHandlers';
import { friendHandlers } from './handlers/friendHandlers';

export const handlers = [...categoryHandlers, ...onboardingHandlers, ...friendHandlers];
