import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from './components/splash-screen';
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
    <SafeAreaProvider>
      <SplashScreen />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
