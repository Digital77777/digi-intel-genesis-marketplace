
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    console.log('Attempting signup for:', email);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      console.log('Signup result:', { data, error });
      
      if (error) {
        console.error('Signup error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        setLoading(false);
        return { error };
      }
      
      // Check if user was created successfully
      if (data.user) {
        console.log('User created successfully:', data.user.email);
        
        // If user is confirmed immediately (no email confirmation required)
        if (data.session) {
          console.log('User logged in immediately after signup');
          setLoading(false);
          return { error: null };
        }
        
        // If email confirmation is required
        console.log('Email confirmation may be required');
        setLoading(false);
        return { 
          error: { 
            message: 'Account created! Please check your email if confirmation is required, or try signing in.',
            type: 'success' 
          } 
        };
      }
      
      setLoading(false);
      return { error: null };
    } catch (err: any) {
      console.error('Signup exception:', err);
      setLoading(false);
      return { error: { message: err.message || 'An unexpected error occurred during signup' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting signin for:', email);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log('Signin result:', { data, error });
      
      if (error) {
        console.error('Signin error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
      }
      
      setLoading(false);
      return { error };
    } catch (err: any) {
      console.error('Signin exception:', err);
      setLoading(false);
      return { error: { message: err.message || 'An unexpected error occurred during signin' } };
    }
  };

  const signOut = async () => {
    console.log('Signing out');
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
