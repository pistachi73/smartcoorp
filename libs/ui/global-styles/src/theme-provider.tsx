'use client';

import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { GlobalStyles } from './global-styles';
import { darkTheme, lightTheme } from './theme/theme';

export type Theme = 'light' | 'dark';
export type ThemeProps = {
  /** Theme Provider content */
  children?: React.ReactNode;
  /** LightTheme from specific project */
  lightTheme?: any;
  /** DarkTheme from spicific project */
  darkTheme?: any;
  /** Theme */
  theme: Theme;
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

  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </SCThemeProvider>
  );
};
