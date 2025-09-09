'use client'
import {AuthPage} from '@/components/AuthPage'
import { AuthProvider, useAuth } from '@/components/AuthProvider'
import React, { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'

const AuthRedirect: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if not loading and user is authenticated
    if (!loading && isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'user') {
        router.push('/users')
      } else if (user.role === 'moderator') {
        router.push('/moderator') // Optional: handle moderator role
      }
    }
  }, [user, loading, isAuthenticated, router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is already authenticated, don't show auth page
  // The useEffect will handle the redirect
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  // Show auth page if not authenticated
  return <AuthPage />
}

const Page = () => {
  return (
    <AuthProvider>
      <AuthRedirect />
    </AuthProvider>
  )
}

export default Page