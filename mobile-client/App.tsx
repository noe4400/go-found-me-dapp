import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { googleFontsToLoad } from './theme/fonts';

export default function App() {
  const [fontsLoaded, fontError] = useFonts(googleFontsToLoad);

  if (fontError != null) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go Found Me</Text>
      <Text style={styles.subtitle}>Theme wired — open theme/fundraisingTheme.ts to tune colors.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontFamily: theme.typography.fontFamily.display.bold,
    fontSize: theme.typography.fontSize.titleLarge,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.sans.regular,
    fontSize: theme.typography.fontSize.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}));
