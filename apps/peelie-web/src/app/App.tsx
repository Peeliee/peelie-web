import { Outlet } from 'react-router-dom';

import { QueryProvider } from './provider/QueryProvider';
import { ThemeProvider } from './provider/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <main>
        <QueryProvider>
          <Outlet />
        </QueryProvider>
      </main>
    </ThemeProvider>
  );
}
