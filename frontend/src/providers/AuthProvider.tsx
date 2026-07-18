'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { authService } from '../features/auth/services/auth.service';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, setAuthenticated } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (mounted) {
          setUser(user);
          setAuthenticated(true);
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, [setUser, setAuthenticated]);

  if (isInitializing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <LoadingSpinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}
