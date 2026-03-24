import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateAvatar } from '@/app/utils/placeholder';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role?: 'user' | 'admin' | 'moderator';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userId: string | null;
  login: (userId: string, username: string, email: string, avatar?: string, role?: 'user' | 'admin' | 'moderator') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'untouchables_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userId: string, username: string, email: string, avatar?: string, role?: 'user' | 'admin' | 'moderator') => {
    const newUser: User = {
      id: userId,
      username,
      email,
      avatar: avatar || generateAvatar(username),
      role,
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    userId: user?.id || null,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}