import { Outlet } from 'react-router-dom';

import Toaster from '@/shared/ui/common/sonner';

import { BridgeProvider, QueryProvider, ThemeProvider } from './provider';

export default function App() {
  return (
    <ThemeProvider>
      <main>
        <BridgeProvider>
          <QueryProvider>
            <Outlet />
          </QueryProvider>
        </BridgeProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}
