/**
 * GoFundMe-inspired fundraising theme (light + dark).
 * Palette aligns with the 2026 GoFundMe ecosystem greens (forest → mint) and
 * typical campaign / donation UI patterns.
 *
 * If your Figma file differs, replace the hex values here — Unistyles will pick them up everywhere.
 */

const palette = {
  forest: '#274A34',
  leaf: '#4A9D43',
  lime: '#A1EC6B',
  mint: '#E9FCCE',
  sand: '#F6F1E8',
  coral: '#E85D75',
  sky: '#2B7A9B',
  amber: '#E8B339',
  danger: '#D32F2F',
  ink: '#1A1F1E',
  slate: '#4A5350',
  mist: '#6B7670',
  cloud: '#E2E8E4',
  frost: '#F7F9F7',
  white: '#FFFFFF',
  black: '#0A0D0C',
} as const;

const spacing = {
  /** 4 */
  xxs: 4,
  /** 8 */
  xs: 8,
  /** 12 */
  sm: 12,
  /** 16 */
  md: 16,
  /** 24 */
  lg: 24,
  /** 32 */
  xl: 32,
  /** 48 */
  xxl: 48,
} as const;

const radii = {
  xs: 4,
  /** Cards, primary CTAs (Figma ~5px) */
  compact: 5,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  /** Bottom sheet / large top corners (Figma ~32px) */
  sheet: 32,
  full: 9999,
} as const;

/** Loaded via `useFonts(googleFontsToLoad)` — use weight-specific families, not `fontWeight`. */
const typography = {
  fontFamily: {
    /** Plus Jakarta Sans — UI / body */
    sans: {
      regular: 'PlusJakartaSans_400Regular',
      medium: 'PlusJakartaSans_500Medium',
      semibold: 'PlusJakartaSans_600SemiBold',
      bold: 'PlusJakartaSans_700Bold',
    },
    /** Fraunces — headlines / campaign titles */
    display: {
      semibold: 'Fraunces_600SemiBold',
      bold: 'Fraunces_700Bold',
    },
  },
  fontSize: {
    caption: 12,
    bodySmall: 14,
    body: 16,
    bodyLarge: 18,
    titleSmall: 20,
    title: 24,
    titleLarge: 28,
    display: 34,
  },
  lineHeight: {
    tight: 1.15,
    normal: 1.35,
    relaxed: 1.5,
  },
} as const;

type ShadowStyle = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceMuted: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  primaryContainer: string;
  secondary: string;
  onSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderSubtle: string;
  overlay: string;
  scrim: string;
  link: string;
  success: string;
  warning: string;
  error: string;
  progressTrack: string;
  progressFill: string;
  heart: string;
  highlight: string;
  accentWash: string;
  /** Figma Splash (1:26) — CTA & tagline */
  splashCtaBackground: string;
  splashTagline: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    display: {
      semibold: string;
      bold: string;
    };
  };
  fontSize: {
    caption: number;
    bodySmall: number;
    body: number;
    bodyLarge: number;
    titleSmall: number;
    title: number;
    titleLarge: number;
    display: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface AppTheme {
  colors: ThemeColors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: ThemeTypography;
  elevation: {
    card: ShadowStyle;
    raised: ShadowStyle;
  };
}

export const lightTheme: AppTheme = {
  colors: {
    background: palette.white,
    backgroundSecondary: palette.frost,
    surface: palette.white,
    surfaceMuted: palette.mint,
    primary: palette.leaf,
    primaryPressed: palette.forest,
    onPrimary: palette.white,
    primaryContainer: palette.mint,
    secondary: palette.forest,
    onSecondary: palette.white,
    text: palette.ink,
    textSecondary: palette.slate,
    textMuted: palette.mist,
    textInverse: palette.white,
    border: palette.cloud,
    borderSubtle: '#F0F4F0',
    overlay: 'rgba(10, 13, 12, 0.45)',
    scrim: 'rgba(10, 13, 12, 0.55)',
    link: palette.sky,
    success: palette.leaf,
    warning: palette.amber,
    error: palette.danger,
    progressTrack: palette.cloud,
    progressFill: palette.leaf,
    heart: palette.coral,
    highlight: palette.lime,
    accentWash: palette.sand,
    splashCtaBackground: '#4ba663',
    splashTagline: '#313131',
  },
  spacing,
  radii,
  typography,
  elevation: {
    card: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    raised: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};

export const darkTheme: AppTheme = {
  colors: {
    background: palette.black,
    backgroundSecondary: '#121816',
    surface: '#1A211E',
    surfaceMuted: '#222A26',
    primary: palette.lime,
    primaryPressed: palette.leaf,
    onPrimary: palette.black,
    primaryContainer: '#2D3D32',
    secondary: palette.mint,
    onSecondary: palette.black,
    text: '#F2F6F4',
    textSecondary: '#B8C2BC',
    textMuted: '#8A9690',
    textInverse: palette.black,
    border: '#2F3A35',
    borderSubtle: '#252E2A',
    overlay: 'rgba(0, 0, 0, 0.55)',
    scrim: 'rgba(0, 0, 0, 0.65)',
    link: '#6BC4E8',
    success: palette.lime,
    warning: '#F0C14D',
    error: '#FF6B6B',
    progressTrack: '#2F3A35',
    progressFill: palette.lime,
    heart: '#FF8A9B',
    highlight: palette.leaf,
    accentWash: '#1E2822',
    splashCtaBackground: '#4ba663',
    splashTagline: '#313131',
  },
  spacing,
  radii,
  typography,
  elevation: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation: 4,
    },
    raised: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.45,
      shadowRadius: 28,
      elevation: 12,
    },
  },
};
