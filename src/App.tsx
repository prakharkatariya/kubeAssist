import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AuthProvider from '@/contexts/AuthProvider';
import { NotistackProvider } from '@components/NotistackProvider';
import Login from '@pages/auth/Login';
import DefaultLayout from '@layout/defaultLayout';
import GuestGuard from '@guards/GuestGuard';
import AppStateProvider from '@/contexts/AppStateProvider';

function App() {
  return (
    <>
      <NotistackProvider>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="*"
              element={
                <AppStateProvider>
                  <DefaultLayout />
                </AppStateProvider>
              }
            />
          </Routes>
        </AuthProvider>
      </NotistackProvider>
    </>
  );
}

const Root: React.FC = () => {
  const appVersion = process.env.REACT_APP_VERSION;
  console.log('App version:', appVersion);

  useEffect(() => {
    const lastVersion = localStorage.getItem('app_version');
    const currentVersion = process.env.REACT_APP_VERSION || '0.1.0-local';

    if (lastVersion && lastVersion !== currentVersion) {
      localStorage.setItem('app_version', currentVersion);
      console.log('Cache clear', 'in-progress');
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      console.log('Cache clear', 'done');
    } else if (!lastVersion) {
      localStorage.setItem('app_version', currentVersion);
    }
  }, []);

  return <App />;
};

export default Root;
