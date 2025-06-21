
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  signUp: (email: string, password: string, businessName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    console.log('AuthProvider initializing...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', { _event, session });
      setSession(session);
      setUser(session?.user ?? null);
      setIsEmailVerified(!!session?.user?.email_confirmed_at);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Initial session check:', { session, error });
      setSession(session);
      setUser(session?.user ?? null);
      setIsEmailVerified(!!session?.user?.email_confirmed_at);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, businessName: string) => {
    console.log('Attempting signup for:', email);
    
    // Security fix: Always include emailRedirectTo
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          business_name: businessName,
        },
      },
    });
    console.log('Signup result:', { data, error });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting signin for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Signin result:', { data, error });
    return { data, error };
  };

  const signInWithGoogle = async () => {
    console.log('Attempting Google signin');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    console.log('Google signin result:', { data, error });
    return { data, error };
  };

  const signOut = async () => {
    console.log('Signing out user');
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setIsEmailVerified(false);
    setLoading(false);
  };

  const resendVerification = async () => {
    if (!user?.email) return { error: 'No user email found' };
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
