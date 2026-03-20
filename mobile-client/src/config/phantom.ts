/**
 * Phantom Connect — must match Phantom Portal (App ID + redirect URL) and app.json:
 * expo.scheme, ios.scheme, android.scheme (see .env.example).
 */
export const PHANTOM_SCHEME = 'solfundme';

export const PHANTOM_APP_ID = process.env.EXPO_PUBLIC_PHANTOM_APP_ID ?? '';

/** Must match Phantom Portal redirect (e.g. solfundme://auth/callback). */
export const phantomAuthRedirectUrl = `${PHANTOM_SCHEME}://auth/callback`;
