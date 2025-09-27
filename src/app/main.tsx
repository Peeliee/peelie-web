import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';
import '../global.css';

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('@/mocks/browers');
//   worker.start();
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
