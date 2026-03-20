import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo } from 'react';
import type { PressableStateCallbackType } from 'react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from 'react-native-unistyles/components/native/Pressable';
import { StyleSheet } from 'react-native-unistyles';

import type { RootStackParamList } from '../navigation/types';
import { useWalletConnection } from '../hooks/useWalletConnection';

/** Fixed sheet height: one snap = sheet is exactly this tall (not a “max” cap). */
const WALLET_SHEET_SNAP_PCT = '30%';

/** Figma “start screen” (108:15) — choice cards + wallet bottom sheet */
export function StartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { openConnectModal, isConnected, solanaAddress } = useWalletConnection();
  /** Single detent → sheet height is exactly 30% of the container (not a max-with-dynamic-sizing). */
  const snapPoints = useMemo(() => [WALLET_SHEET_SNAP_PCT], []);

  return (
    <View style={styles.root}>
      <View style={[styles.main, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.headline}>What do you have in mind?</Text>

        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('CreateCampaign')}
          accessibilityRole="button"
          accessibilityLabel="Create a campaign"
        >
          <MaterialCommunityIcons color="#4BA663" name="heart-circle-outline" size={40} />
          <Text style={styles.cardLabel}>Create a campaign</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('SearchCampaigns')}
          accessibilityRole="button"
          accessibilityLabel="Search for campaigns"
        >
          <MaterialCommunityIcons color="#4BA663" name="hand-heart" size={40} />
          <Text style={styles.cardLabel}>Search for campaigns</Text>
        </Pressable>
      </View>

      <View style={styles.dimOverlay} pointerEvents="none" />

      <BottomSheet
        backgroundStyle={styles.sheetBackground}
        enableDynamicSizing={false}
        enableHandlePanningGesture={false}
        enablePanDownToClose={false}
        handleComponent={null}
        index={0}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.sheetInner}>
          <Text style={styles.sheetTitle}>Add a wallet to start</Text>
          {isConnected && solanaAddress != null ? (
            <Text style={styles.sheetSubtitle} numberOfLines={1}>
              {solanaAddress}
            </Text>
          ) : null}
          <Pressable
            style={styles.walletCta}
            onPress={() => openConnectModal()}
            accessibilityRole="button"
            accessibilityLabel="Connect Phantom wallet"
          >
            <Text style={styles.walletCtaLabel}>
              {isConnected ? 'Manage wallet' : 'Connect phantom wallet'}
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    gap: theme.spacing.lg,
  },
  headline: {
    fontFamily: theme.typography.fontFamily.sans.bold,
    fontSize: theme.typography.fontSize.titleLarge,
    color: theme.colors.text,
  },
  card: (state: PressableStateCallbackType) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    minHeight: 106,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.compact,
    backgroundColor: '#FFFFFF',
    opacity: state.pressed ? 0.92 : 1,
    ...theme.elevation.card,
  }),
  cardLabel: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.sans.semibold,
    fontSize: theme.typography.fontSize.title,
    color: theme.colors.text,
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(36, 55, 87, 0.65)',
  },
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: theme.radii.sheet,
    borderTopRightRadius: theme.radii.sheet,
  },
  sheetInner: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
  },
  sheetTitle: {
    fontFamily: theme.typography.fontFamily.sans.bold,
    fontSize: theme.typography.fontSize.titleSmall,
    color: theme.colors.text,
    textAlign: 'center',
  },
  sheetSubtitle: {
    marginTop: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans.regular,
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  walletCta: (state: PressableStateCallbackType) => ({
    height: 59,
    borderRadius: theme.radii.compact,
    backgroundColor: theme.colors.splashCtaBackground,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    opacity: state.pressed ? 0.9 : 1,
    marginTop: theme.spacing.xl,
  }),
  walletCtaLabel: {
    fontFamily: theme.typography.fontFamily.sans.semibold,
    fontSize: theme.typography.fontSize.titleSmall,
    color: '#FFFFFF',
  },
}));
