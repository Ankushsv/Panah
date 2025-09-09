'use client';
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { AuthPage } from '@/components/AuthPage';
import { Navigation } from '@/app/(dashboard)/(users)/components/Navigation';
import { Dashboard } from '@/app/(dashboard)/(users)/components/Dashboard';
import Chatbox from '@/app/(dashboard)/(users)/components/Chatbox';
import { Booking } from '@/app/(dashboard)/(users)/components/Booking';
import { Forum } from '@/app/(dashboard)/(users)/components/Forum';
import { Videos } from '@/app/(dashboard)/(users)/components/Videos';
import { Journal } from '@/app/(dashboard)/(users)/components/Journal';
import { MentalHealthEvaluation } from '@/app/(dashboard)/(users)/components/MentalHealthEvaluation';
import { Resources } from '@/app/(dashboard)/(users)/components/Resources';
import { useProtectedRoute } from '@/app/hooks/useProtectedRoute';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
    const { isAuthorized, loading } = useProtectedRoute({ 
    requiredRoles: ['user'] 
  });



  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-600">Loading your mental health companion...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'chatbox':
        return <Chatbox setActiveTab={setActiveTab} />;
      case 'booking':
        return <Booking />;
      case 'forum':
        return <Forum />;
      case 'videos':
        return <Videos />;
      case 'journal':
        return <Journal />;
      case 'evaluation':
        return <MentalHealthEvaluation />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}