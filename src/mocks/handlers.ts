import { categoryHandlers } from './handlers/categoryHandlers';
import { onboardingHandlers } from './handlers/onboardingHandlers';

export const handlers = [...categoryHandlers, ...onboardingHandlers];
