import { Image } from 'expo-image';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

/** Figma frame “Splash screen” (node 1:26) — hero + logo + tagline + CTA */
const HERO_HEIGHT_RATIO = 0.42;
const LOGO_ASPECT = 90 / 162;

export type SplashScreenProps = {
  onStartPress?: () => void;
};

export function SplashScreen({ onStartPress }: SplashScreenProps) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const heroHeight = Math.round(height * HERO_HEIGHT_RATIO);
  const logoWidth = Math.min(162, width - 48);
  const logoHeight = logoWidth * LOGO_ASPECT;

  return (
    <View style={styles.root}>
      <View style={[styles.heroClip, { height: heroHeight }]}>
        <Image
          source={require('../assets/splash/splash-hero.jpg')}
          style={styles.heroImage}
          contentFit="cover"
          transition={200}
        />
      </View>

      <View style={[styles.body, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.centerBlock}>
          <Image
            source={require('../assets/splash/splash-logo.png')}
            style={{ width: logoWidth, height: logoHeight }}
            contentFit="contain"
            transition={200}
          />
          <Text style={styles.tagline}>
            The #1 and most trusted fundraising platform
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={onStartPress}
          accessibilityRole="button"
          accessibilityLabel="Start a GoFundMe"
        >
          <Text style={styles.ctaLabel}>Start a GoFundMe</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroClip: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: theme.radii.xl,
    borderBottomRightRadius: theme.radii.xl,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  tagline: {
    fontFamily: theme.typography.fontFamily.sans.regular,
    fontSize: theme.typography.fontSize.titleLarge,
    lineHeight: theme.typography.fontSize.titleLarge * theme.typography.lineHeight.normal,
    color: theme.colors.splashTagline,
    textAlign: 'center',
    maxWidth: 326,
  },
  cta: {
    height: 59,
    borderRadius: 5,
    backgroundColor: theme.colors.splashCtaBackground,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaLabel: {
    fontFamily: theme.typography.fontFamily.sans.semibold,
    fontSize: theme.typography.fontSize.titleSmall,
    color: '#FFFFFF',
  },
}));
