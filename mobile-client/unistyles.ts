import { StyleSheet } from 'react-native-unistyles';

import { darkTheme, lightTheme, type AppTheme } from './theme/fundraisingTheme';

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export const appBreakpoints = {
  xs: 0,
  sm: 390,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

StyleSheet.configure({
  themes: appThemes,
  breakpoints: appBreakpoints,
  settings: {
    adaptiveThemes: true,
  },
});

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: AppTheme;
    dark: AppTheme;
  }

  export interface UnistylesBreakpoints {
    xs: 0;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  }
}
