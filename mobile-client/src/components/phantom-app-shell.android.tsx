import { useEffect, type ReactNode } from 'react';

import { PHANTOM_SCHEME } from '../config/phantom';

export function PhantomAppShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (__DEV__) {
      console.warn(
        `[Phantom] Connect on Android is not wired yet (scheme ${PHANTOM_SCHEME} reserved for future).`,
      );
    }
  }, []);

  return <>{children}</>;
}
