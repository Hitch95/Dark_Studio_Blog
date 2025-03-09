'use client';

import { createContext, ReactNode, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  mode: Theme;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggle: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<Theme>('dark');

  const toggle = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
