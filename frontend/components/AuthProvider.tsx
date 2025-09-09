import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  level: number;
  badges: string[];
  joinedDate: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string; user?: User }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string; user?: User }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      // Try to get user profile from server
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/user/profile`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // If profile doesn't exist, create default profile
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const defaultUser: User = {
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || 'User',
            role: 'user', // Default role
            level: 1,
            badges: ['Welcome'],
            joinedDate: new Date()
          };
          setUser(defaultUser);
          await updateUserProfile(defaultUser);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error?: string; user?: User }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error: error.message };
      }

      // Load user profile after successful sign in
      if (data.user) {
        await loadUserProfile(data.user.id);
        // Wait for user state to update
        const currentUser = await new Promise<User | null>((resolve) => {
          setTimeout(() => resolve(user), 0);
        });
        if (currentUser) {
          return { user: currentUser };
        }
      }
      const signInResult = await signIn(email, password);
      return signInResult;
    } catch (error) {
      return { error: 'An unexpected error occurred during sign in' };
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ error?: string; user?: User }> => {
    try {
      // Call server endpoint for signup
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/auth/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name
        })
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: result.error || 'Failed to create account' };
      }

      // After successful signup, sign in the user
      const signInResult = await signIn(email, password);
      if (signInResult.user) {
        return { user: signInResult.user };
      } else if (signInResult.error) {
        return { error: signInResult.error };
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred during sign up' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Save to server
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}