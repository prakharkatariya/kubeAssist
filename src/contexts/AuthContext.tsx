import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, AuthResponse, UserInfo, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock API call - replace with your actual API
const mockLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful response
  if (credentials.domainId.length >= 5 && credentials.password.length >= 1) {
    return {
      access_token: 'mock-access-token-' + Date.now(),
      session_id: 'mock-session-id-' + Date.now(),
      user_info: {
        id: '1',
        domainId: credentials.domainId,
        email: `${credentials.domainId}@company.com`,
        displayName: credentials.domainId.charAt(0).toUpperCase() + credentials.domainId.slice(1),
        role: 'user', // or 'admin'
        permissions: ['read', 'write']
      }
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // Check for existing session on app load
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const sessionId = localStorage.getItem('session_id');
        const userInfo = localStorage.getItem('user_info');

        if (accessToken && sessionId && userInfo) {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        // Clear corrupted data
        localStorage.removeItem('access_token');
        localStorage.removeItem('session_id');
        localStorage.removeItem('user_info');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await mockLogin(credentials);
      
      // Store in localStorage
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('session_id', response.session_id);
      localStorage.setItem('user_info', JSON.stringify(response.user_info));
      
      // Update state
      setUser(response.user_info);
      
      // Navigate to last visited route or dashboard
      const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
      navigate(lastVisitedRoute || '/dashboard', { replace: true });
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('session_id');
    localStorage.removeItem('user_info');
    localStorage.removeItem('lastVisitedRoute');
    
    // Clear state
    setUser(null);
    
    // Navigate to login
    navigate('/signin', { replace: true });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};