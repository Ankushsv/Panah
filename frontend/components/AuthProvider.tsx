"use client"; // 👈 required in App Router

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "moderator";
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
    throw new Error("useAuth must be used within an AuthProvider");
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
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await loadUserProfile(session.user.id);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/signin"); // 👈 redirect here on sign out
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const loadUserProfile = async (userId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const defaultUser: User = {
            id: authUser.id,
            email: authUser.email || "",
            name: authUser.user_metadata?.name || "User",
            role: "user",
            level: 1,
            badges: ["Welcome"],
            joinedDate: new Date(),
          };
          setUser(defaultUser);
          await updateUserProfile(defaultUser);
        }
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error?: string; user?: User }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: error.message };

      if (data.user) {
        await loadUserProfile(data.user.id);
        if (user) {
          return { user };
        } else {
          return {};
        }
      }

      return {};
    } catch (error) {
      return { error: "An unexpected error occurred during sign in" };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ error?: string; user?: User }> => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/auth/signup`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const result = await response.json();
      if (!response.ok) return { error: result.error || "Failed to create account" };

      return await signIn(email, password); // 👈 sign in after sign up
    } catch (error) {
      return { error: "An unexpected error occurred during sign up" };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      router.push("/signin"); // ✅ safe redirect
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad91a532/user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
