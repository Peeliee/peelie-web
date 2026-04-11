import { Outlet } from 'react-router-dom';

import { QueryProvider } from './provider/QueryProvider';
import { ThemeProvider } from './provider/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <main>
        <QueryProvider>
          <Outlet />
        </QueryProvider>
      </main>
    </ThemeProvider>
  );
};

export default App;
