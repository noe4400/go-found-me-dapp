import { AddressType, PhantomProvider } from '@phantom/react-native-sdk';
import type { ReactNode } from 'react';

import { PHANTOM_APP_ID, PHANTOM_SCHEME, phantomAuthRedirectUrl } from '../config/phantom';

export function PhantomAppShell({ children }: { children: ReactNode }) {
  if (__DEV__ && !PHANTOM_APP_ID) {
    console.warn(
      '[Phantom] EXPO_PUBLIC_PHANTOM_APP_ID is empty. Set it in .env to match your Phantom Portal app.',
    );
  }

  return (
    <PhantomProvider
      config={{
        providers: ['google', 'apple'],
        appId: PHANTOM_APP_ID || 'placeholder',
        scheme: PHANTOM_SCHEME,
        addressTypes: [AddressType.solana],
        authOptions: {
          redirectUrl: phantomAuthRedirectUrl,
        },
      }}
    >
      {children}
    </PhantomProvider>
  );
}
