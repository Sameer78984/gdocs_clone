'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/auth.store';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean; // If true, requires auth. If false, requires NO auth (e.g. login page).
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // We assume AuthProvider has already run its initial check and resolved.
    // At this point, isAuthenticated reflects the true session state.
    
    if (requireAuth && !isAuthenticated) {
      router.replace('/login');
    } else if (!requireAuth && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, requireAuth, router, pathname]);

  // While redirecting, don't flash the protected content
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!requireAuth && isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
