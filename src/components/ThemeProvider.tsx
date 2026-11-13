'use client';

import * as React from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | undefined>(undefined);

const emptySnapshot = () => null;

function readStoredTheme(storageKey: string): Theme | null {
  const stored = localStorage.getItem(storageKey);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'furma-theme',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [override, setOverride] = React.useState<Theme | null>(null);

  const getSnapshot = React.useCallback(
    () => readStoredTheme(storageKey),
    [storageKey]
  );

  const storedTheme = React.useSyncExternalStore(
    subscribeToStorage,
    getSnapshot,
    emptySnapshot
  );

  const theme = override ?? storedTheme ?? defaultTheme;

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        setOverride(newTheme);
        localStorage.setItem(storageKey, newTheme);
      },
    }),
    [theme, storageKey]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
