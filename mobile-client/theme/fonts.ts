import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';

/**
 * Map passed to `useFonts` from `expo-font`. Keys become valid `fontFamily` names.
 * @see https://www.npmjs.com/package/@expo-google-fonts/plus-jakarta-sans
 * @see https://www.npmjs.com/package/@expo-google-fonts/fraunces
 */
export const googleFontsToLoad = {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} as const;
