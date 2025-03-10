'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { useSupabase } from '../../context/AuthContext';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error while trying to get the User:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      console.log('(useAuth) Result of the session object: ', session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return {
    user,
    loading,
    signOut,
    signInWithGoogle,
  };
};
