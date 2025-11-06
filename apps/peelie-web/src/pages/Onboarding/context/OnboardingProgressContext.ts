import { createContext, useContext } from 'react';

interface OnboardingProgressContextType {
  showProgress: boolean;
  setShowProgress: (v: boolean) => void;
}

export const OnboardingProgressContext = createContext<OnboardingProgressContextType>({
  showProgress: true,
  setShowProgress: () => {},
});

export const useOnboardingProgress = () => useContext(OnboardingProgressContext);
