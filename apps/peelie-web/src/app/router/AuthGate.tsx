import { Navigate, Outlet } from 'react-router-dom';
import PATH from '@/shared/constants/path';

export default function AuthGate() {
  const hasToken = !!localStorage.getItem('accessToken');

  if (!hasToken) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <Outlet />;
}
