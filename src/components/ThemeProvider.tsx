'use client';

import * as React from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'furma-theme',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const fallback = React.useRef<Theme>(defaultTheme);
  const subscribe = React.useCallback((onChange: () => void) => {
    window.addEventListener('storage', onChange);
    window.addEventListener('furma-theme-change', onChange);
    return () => {
      window.removeEventListener('storage', onChange);
      window.removeEventListener('furma-theme-change', onChange);
    };
  }, []);
  const getSnapshot = React.useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored === 'light' || stored === 'dark' ? stored : fallback.current;
    } catch {
      return fallback.current;
    }
  }, [storageKey]);
  const getServerSnapshot = React.useCallback(() => defaultTheme, [defaultTheme]);
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setTheme = React.useCallback((next: Theme) => {
    fallback.current = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // The current tab can still switch themes when storage is unavailable.
    }
    window.dispatchEvent(new Event('furma-theme-change'));
  }, [storageKey]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
