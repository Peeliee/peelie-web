import { Navigate, Outlet } from 'react-router-dom';

import { useFcmTokenSync } from '@/entities/push';
import PATH from '@/shared/constants/path';

export default function AuthGate() {
  const hasToken = !!localStorage.getItem('accessToken');

  useFcmTokenSync({ enabled: hasToken });

  if (!hasToken) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <Outlet />;
}
