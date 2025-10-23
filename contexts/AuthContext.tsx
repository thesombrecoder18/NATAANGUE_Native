import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserStorage } from '../services/userStorage';

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await UserStorage.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = await UserStorage.authenticateUser(identifier, password);
      if (authenticatedUser) {
        await UserStorage.setCurrentUser(authenticatedUser);
        setUser(authenticatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      // Vérifier si l'utilisateur existe déjà
      const exists = await UserStorage.userExists(userData.username) || 
                    await UserStorage.userExists(userData.phone) ||
                    (userData.email && await UserStorage.userExists(userData.email));
      
      if (exists) {
        return false;
      }

      const newUser = await UserStorage.saveUser(userData);
      await UserStorage.setCurrentUser(newUser);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await UserStorage.logout();
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
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
