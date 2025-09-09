// app/admin/page.tsx
'use client'
import React from 'react';
import { useProtectedRoute } from '@/app/hooks/useProtectedRoute';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Settings, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthorized, loading } = useProtectedRoute({ 
    requiredRoles: ['admin'] 
  });
  const { user, signOut } = useAuth();

  // Show loading state
  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Management Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Manage user accounts, roles, and permissions
                </p>
                <Button className="w-full">
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            {/* System Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>System Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Configure system-wide settings and preferences
                </p>
                <Button className="w-full" variant="outline">
                  System Config
                </Button>
              </CardContent>
            </Card>

            {/* Analytics Card */}
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  View system analytics and reports
                </p>
                <Button className="w-full" variant="outline">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Info Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user?.role}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Level</p>
                  <p className="text-sm text-gray-900">{user?.level}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthProvider>
  );
};

export default AdminDashboard;