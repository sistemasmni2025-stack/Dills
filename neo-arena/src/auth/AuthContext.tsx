import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from './firebase';

interface User {
  id: string;
  name: string;
  email: string;
  provider?: 'google' | 'microsoft' | 'yahoo' | 'email';
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  loginWithProvider: (provider: 'google' | 'microsoft' | 'yahoo') => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRedirectPath: (path: string | null) => void;
  redirectPath: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const unsub = authApi.onChange((fbUser) => {
      if (fbUser) {
        setUser({
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email || 'Usuario',
          email: fbUser.email || '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub && unsub();
  }, []);

  const loginWithProvider = async (provider: 'google' | 'microsoft' | 'yahoo') => {
    setLoading(true);
    try {
      const fbUser = await authApi.signInWithProvider(provider);
      setUser({
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email || 'Usuario',
        email: fbUser.email || '',
        provider,
      });
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const fbUser = await authApi.registerWithEmail(name, email, password);
      setUser({
        id: fbUser.uid,
        name: fbUser.displayName || name || email,
        email: fbUser.email || email,
        provider: 'email',
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const fbUser = await authApi.signInWithEmail(email, password);
      setUser({
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email || 'Usuario',
        email: fbUser.email || email,
        provider: 'email',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.signOut();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      loginWithProvider,
      registerWithEmail,
      signInWithEmail,
      logout,
      setRedirectPath,
      redirectPath,
    }),
    [user, loading, redirectPath]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
