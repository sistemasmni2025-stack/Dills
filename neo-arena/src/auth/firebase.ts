import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  type Auth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const ensureFirebase = () => {
  if (app && auth) return { app, auth };
  if (!cfg.apiKey || !cfg.authDomain || !cfg.projectId || !cfg.appId) {
    return { app: null, auth: null };
  }
  app = initializeApp(cfg);
  auth = getAuth(app);
  return { app, auth };
};

export const providers = {
  google: new GoogleAuthProvider(),
  microsoft: new OAuthProvider('microsoft.com'),
  yahoo: new OAuthProvider('yahoo.com'),
};

export const authApi = {
  signInWithProvider: async (provider: 'google' | 'microsoft' | 'yahoo') => {
    const { auth } = ensureFirebase();
    if (!auth) throw new Error('Firebase Auth no configurado');
    const cred = await signInWithPopup(auth, providers[provider]);
    return cred.user;
  },
  signOut: async () => {
    const { auth } = ensureFirebase();
    if (!auth) return;
    await signOut(auth);
  },
  onChange: (cb: (user: import('firebase/auth').User | null) => void) => {
    const { auth } = ensureFirebase();
    if (!auth) {
      cb(null);
      return () => {};
    }
    return onAuthStateChanged(auth, cb);
  },
  registerWithEmail: async (name: string, email: string, password: string) => {
    const { auth } = ensureFirebase();
    if (!auth) throw new Error('Firebase Auth no configurado');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return cred.user;
  },
  signInWithEmail: async (email: string, password: string) => {
    const { auth } = ensureFirebase();
    if (!auth) throw new Error('Firebase Auth no configurado');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  },
};
