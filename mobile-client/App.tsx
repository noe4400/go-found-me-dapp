import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PhantomAppShell } from './src/components/phantom-app-shell';
import { RootStack } from './src/navigation/root-stack';
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PhantomAppShell>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootStack />
              <StatusBar style="dark" />
            </NavigationContainer>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </PhantomAppShell>
    </GestureHandlerRootView>
  );
}
