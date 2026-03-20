import { AddressType, useAccounts, useModal } from '@phantom/react-native-sdk';

import type { UseWalletConnectionResult } from '../services/wallet/wallet.types';

export function useWalletConnection(): UseWalletConnectionResult {
  const modal = useModal();
  const { addresses, isConnected } = useAccounts();

  const solanaAddress =
    addresses.find((a) => a.addressType === AddressType.solana)?.address ?? null;

  return {
    openConnectModal: () => modal.open(),
    isConnected,
    solanaAddress,
  };
}
