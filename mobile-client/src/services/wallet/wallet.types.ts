export type WalletConnectionState = {
  isConnected: boolean;
  /** Base58 Solana address when connected */
  solanaAddress: string | null;
};

export type UseWalletConnectionResult = WalletConnectionState & {
  openConnectModal: () => void;
};
