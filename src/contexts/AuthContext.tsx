import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { User, UserRole, Badge } from '@/types';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  currentBadge: Badge | null;
  nextBadge: Badge | null;
  progressToNextBadge: number;
  addPoints: (amount: number) => void;
}

export const badges: Badge[] = [
  { id: '1', name: 'Newbie', level: 1, requiredPoints: 20, icon: '🌱', color: 'badge-newbie' },
  { id: '2', name: 'Explorer', level: 2, requiredPoints: 40, icon: '🔍', color: 'badge-explorer' },
  { id: '3', name: 'Achiever', level: 3, requiredPoints: 60, icon: '⭐', color: 'badge-achiever' },
  { id: '4', name: 'Specialist', level: 4, requiredPoints: 80, icon: '🎯', color: 'badge-specialist' },
  { id: '5', name: 'Expert', level: 5, requiredPoints: 100, icon: '💎', color: 'badge-expert' },
  { id: '6', name: 'Master', level: 6, requiredPoints: 120, icon: '👑', color: 'badge-master' },
];

const getCurrentBadge = (points: number): Badge => {
  return [...badges].reverse().find(b => points >= b.requiredPoints) || badges[0];
};

const getNextBadge = (points: number): Badge | null => {
  return badges.find(b => b.requiredPoints > points) || null;
};

const getProgressToNextBadge = (points: number): number => {
  const current = getCurrentBadge(points);
  const next = getNextBadge(points);

  if (!next) return 100;

  const range = next.requiredPoints - current.requiredPoints;
  const progress = points - current.requiredPoints;

  if (range <= 0) return 100;

  return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to get stored user data
  const getStoredUserData = (uid: string) => {
    const stored = localStorage.getItem(`user_${uid}`);
    return stored ? JSON.parse(stored) : null;
  };

  // Helper to save user data
  const updateStoredUserData = (uid: string, data: Partial<User>) => {
    const current = getStoredUserData(uid) || {};
    const updated = { ...current, ...data };
    localStorage.setItem(`user_${uid}`, JSON.stringify(updated));
    return updated;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const storedData = getStoredUserData(firebaseUser.uid);

        // Default role to learner if not stored
        const role = storedData?.role || 'learner';
        const totalPoints = storedData?.totalPoints || 0;

        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          avatar: firebaseUser.photoURL || undefined,
          role: role,
          totalPoints: totalPoints,
          createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string, role?: UserRole) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // If a role is specified during login (e.g. from role selector), update it preference
    if (role) {
      updateStoredUserData(userCredential.user.uid, { role });
      // Force update local state immediately
      setUser(prev => prev ? { ...prev, role } : null);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const photoURL = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';

    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL
    });

    // Store initial role and points
    updateStoredUserData(userCredential.user.uid, {
      role,
      totalPoints: 20 // Start with some points
    });

    // Force update local state
    setUser({
      id: userCredential.user.uid,
      email: email,
      name: name,
      avatar: photoURL,
      role: role,
      totalPoints: 20,
      createdAt: new Date().toISOString()
    });
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  const addPoints = useCallback((amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const newPoints = prev.totalPoints + amount;
      updateStoredUserData(prev.id, { totalPoints: newPoints });
      return { ...prev, totalPoints: newPoints };
    });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      updateStoredUserData(user.id, { role });
      setUser({ ...user, role });
    }
  }, [user]);

  const currentBadge = user ? getCurrentBadge(user.totalPoints) : null;
  const nextBadge = user ? getNextBadge(user.totalPoints) : null;
  const progressToNextBadge = user ? getProgressToNextBadge(user.totalPoints) : 0;

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    switchRole,
    currentBadge,
    nextBadge,
    progressToNextBadge,
    addPoints
  }), [user, loading, login, register, logout, switchRole, currentBadge, nextBadge, progressToNextBadge, addPoints]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
