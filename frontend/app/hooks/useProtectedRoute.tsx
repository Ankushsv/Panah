// hooks/useProtectedRoute.ts
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Role = 'user' | 'admin' | 'moderator';

interface UseProtectedRouteOptions {
  requiredRoles?: Role[];
  redirectTo?: string;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { 
    requiredRoles = [], 
    redirectTo = '/auth' 
  } = options;

  useEffect(() => {
    if (loading) return; // Don't do anything while loading

    // If not authenticated, redirect to auth page
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If no specific roles required, just check if authenticated
    if (requiredRoles.length === 0) {
      setIsAuthorized(true);
      return;
    }

    // Check if user has required role
    if (user && requiredRoles.includes(user.role)) {
      setIsAuthorized(true);
    } else {
      // User doesn't have required role, redirect based on their role
      if (user?.role === 'admin') {
        router.push('/admin');
      } else if (user?.role === 'user') {
        router.push('/users');
      } else {
        router.push(redirectTo);
      }
    }
  }, [user, loading, isAuthenticated, requiredRoles, redirectTo, router]);

  return {
    isAuthorized,
    loading,
    user
  };
}