import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '@/types/user';

type AuthContextType = {
  userInfo: User | null;
  setUserInfo: (value: any) => void;
  handleLogin: (accessToken: string, sessionId: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  async function handleLogin(accessToken: string, sessionId: string) {
    const decoded = {'decoded': 'user details'} as any; // todo: decode from access token or from api call
    try {
      setUserInfo(decoded);
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('session_id', sessionId);

      localStorage.setItem('user', JSON.stringify(decoded));
      navigate('/chat');
    } catch (error: any) {
      setUserInfo(null);
      throw error;
    }
  }

  async function handleLogout() {
    setUserInfo(null);
    localStorage.removeItem('user');
    localStorage.clear();
    sessionStorage.clear();
  }

  useEffect(()=> {
    if(localStorage.getItem('user')) {
      setUserInfo(JSON.parse(localStorage.getItem('user') || '{}'))
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
