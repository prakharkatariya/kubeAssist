import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { AppStateType } from '@/types/app';
import { generateSessionId } from '@/utils/util';

type AppStateContextType = {
  appState: AppStateType;
  setAppState: (value: any) => void;
  sessionId?: string | null;
  updateSessionId: (sessionId: string, isNewSession?: boolean) => void;
};

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

type AppStateProviderProps = PropsWithChildren;

export default function AppStateProvider({ children }: AppStateProviderProps) {
  const [appState, setAppState] = useState<AppStateType>({
    sessionId: '',
  });

  const updateSessionId = (session_id: string, isNewSession = false) => {
    const sessionid = isNewSession ? generateSessionId() : session_id;

    setAppState((prevState: any) => ({
      ...prevState,
      sessionId: session_id,
    }));

    const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
    userStorage.sessionId = sessionid;
    localStorage.setItem('user', JSON.stringify(userStorage));
  };

  // Function to update app state on refresh/after-login
  const updateAppState = async () => {
    try {
      const session_id = localStorage.getItem('session_id') || '';
      setAppState((prevState: any) => ({
        ...prevState,
        sessionId: session_id,
      }));
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  useEffect(() => {
    updateAppState();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        appState,
        setAppState,
        updateSessionId,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
