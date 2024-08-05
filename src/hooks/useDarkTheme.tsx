import { useState, useMemo, createContext, ReactNode, useContext } from 'react';
import { CombinedDefaultTheme, CombinedDarkTheme } from '../themes/theme';
import React from 'react';

interface DarkThemeContextType {
  theme: typeof CombinedDefaultTheme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}
const DarkThemeContext = createContext<DarkThemeContextType | undefined>(
  undefined
);
const Provider = DarkThemeContext.Provider;
export const DarkThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
  };

  const theme = useMemo(
    () => (isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme),
    [isDarkTheme]
  );

  const value = useMemo(
    () => ({ isDarkTheme, theme, toggleTheme }),
    [isDarkTheme, theme, toggleTheme]
  );

  return <Provider value={value}>{children}</Provider>;
};

export const useDarkTheme = (): DarkThemeContextType => {
  const context = useContext(DarkThemeContext);
  if (!context) {
    throw new Error('useDarkTheme must be used within a DarkThemeProvider');
  }
  return context;
};
