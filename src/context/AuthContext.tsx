'use client';

import { createContext, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';

interface AuthContextProps {
  user: User | null;
  logout: () => Promise<void>;
}

const defaultContext: AuthContextProps = {
  user: null,
  logout: async () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut();
  };

  const contextValue = {
    user: session?.user || null,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
