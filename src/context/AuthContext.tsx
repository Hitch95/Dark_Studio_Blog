'use client';

import { createContext, useContext, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/client';

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClient());

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase needs to be used inside AuthContext');
  }
  return context.supabase;
};
