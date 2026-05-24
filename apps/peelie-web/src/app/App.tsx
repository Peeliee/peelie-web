import { Outlet } from 'react-router-dom';

import Toaster from '@/shared/ui/common/sonner';

import ConsoleBridge from './provider/ConsoleBridge';
import { BridgeProvider, QueryProvider, ThemeProvider } from './provider';

export default function App() {
  return (
    <ThemeProvider>
      <main>
        <BridgeProvider>
          <ConsoleBridge />
          <QueryProvider>
            <Outlet />
          </QueryProvider>
        </BridgeProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}
