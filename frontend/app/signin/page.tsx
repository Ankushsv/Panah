'use client'
import { AuthPage } from '@/components/AuthPage'
import { AuthProvider, useAuth } from '@/components/AuthProvider'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthRedirect: React.FC = () => {
  const { user } = useAuth() // Adjust according to your AuthProvider
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/users') // Redirect to users if signed in
    }
  }, [user, router])

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