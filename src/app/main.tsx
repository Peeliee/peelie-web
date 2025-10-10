import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';
import '../global.css';

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('@/mocks/browers');
//   worker.start();
// }

if (import.meta.env.VITE_MSW_ENABLED === 'true') {
  const { worker } = await import('@/mocks/browers');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
