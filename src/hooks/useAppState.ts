import { useContext } from 'react';
import { AppStateContext } from '@/contexts/AppStateProvider';

export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used inside of a AppStateProvider');
  }

  return context;
}
