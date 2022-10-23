import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from './theme';

export type ThemeProps = {
  /** Theme Provider content */
  children?: React.ReactNode;
  /** LightTheme from specific project */
  lightTheme?: any;
  /** DarkTheme from spicific project */
  darkTheme?: any;
  /** Theme */
  theme: 'light' | 'dark';
};

export const ThemeProvider: React.FC<ThemeProps> = ({
  children,
  lightTheme: extraLightTheme,
  darkTheme: extraDarkTheme,
  theme: currentTheme,
}) => {
  const dark = extraDarkTheme ? { ...extraDarkTheme, ...darkTheme } : darkTheme;
  const light = extraLightTheme
    ? { ...extraLightTheme, ...lightTheme }
    : lightTheme;

  const theme = currentTheme === 'light' ? light : dark;

  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
};
