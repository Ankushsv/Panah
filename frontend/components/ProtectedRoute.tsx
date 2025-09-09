// components/ProtectedRoute.tsx
'use client'
import React from 'react';
import { useProtectedRoute } from '@/app/hooks/useProtectedRoute';

type Role = 'user' | 'admin' | 'moderator';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Role[];
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles, 
  redirectTo,
  loadingComponent,
  unauthorizedComponent 
}: ProtectedRouteProps) {
  const { isAuthorized, loading } = useProtectedRoute({ 
    requiredRoles, 
    redirectTo 
  });

  // Show custom loading component or default loading
  if (loading) {
    return loadingComponent || (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show custom unauthorized component or default unauthorized
  if (!isAuthorized) {
    return unauthorizedComponent || (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-600 text-6xl">🚫</div>
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-red-500">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}