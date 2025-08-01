import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { userInfo } = useAuth();

  if (userInfo) {
    return <Navigate to={localStorage.getItem('lastLoginPath') || '/dashboard'} />;
  }

  return <>{children}</>;
}
