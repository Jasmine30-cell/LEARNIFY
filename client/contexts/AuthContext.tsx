import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  coins: number;
  level: number;
  streak: number;
  completedGames: Array<{
    levelId: number;
    gameId: string;
    completedAt: string;
    score: number;
  }>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  updateStats: (xpAmount: number, coinAmount: number) => void;
  markGameCompleted: (levelId: number, gameId: string, score: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('learnify_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('learnify_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would validate against backend
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        avatar: undefined,
        xp: 1247,
        coins: 150,
        level: 12,
        streak: 7,
        completedGames: []
      };
      
      setUser(mockUser);
      localStorage.setItem('learnify_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - in real app, this would create user in backend
    if (name && email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        name,
        email,
        avatar: undefined,
        xp: 0,
        coins: 50,
        level: 1,
        streak: 0,
        completedGames: []
      };
      
      setUser(mockUser);
      localStorage.setItem('learnify_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('learnify_user');
  };

  const addXP = (amount: number) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      xp: user.xp + amount,
      level: Math.floor((user.xp + amount) / 500) + 1 // Level up every 500 XP
    };

    setUser(updatedUser);
    localStorage.setItem('learnify_user', JSON.stringify(updatedUser));
  };

  const addCoins = (amount: number) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      coins: user.coins + amount
    };

    setUser(updatedUser);
    localStorage.setItem('learnify_user', JSON.stringify(updatedUser));
  };

  const updateStats = (xpAmount: number, coinAmount: number) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      xp: user.xp + xpAmount,
      coins: user.coins + coinAmount,
      level: Math.floor((user.xp + xpAmount) / 500) + 1
    };

    setUser(updatedUser);
    localStorage.setItem('learnify_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    addXP,
    addCoins,
    updateStats
  };

  return (
    <AuthContext.Provider value={value}>
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
