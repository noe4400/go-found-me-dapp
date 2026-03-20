import type { UseWalletConnectionResult } from '../services/wallet/wallet.types';

/**
 * Android: Phantom Connect is Phase 1 iOS-only; Solana Mobile Wallet Adapter comes later.
 */
export function useWalletConnection(): UseWalletConnectionResult {
  return {
    openConnectModal: () => {},
    isConnected: false,
    solanaAddress: null,
  };
}
