import { createContext, useContext } from 'react';

interface HeaderContextType {
  hideHeader: (hidden: boolean) => void;
  setBackAction: (fn: (() => void) | null) => void;
}

/**
 * 헤더 표시 여부 제어용 context
 */
export const HeaderContext = createContext<HeaderContextType>({
  hideHeader: () => {},
  setBackAction: () => {},
});

export const useHeader = () => useContext(HeaderContext);
