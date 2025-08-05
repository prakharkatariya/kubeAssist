import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from './contexts/AuthContext';
import { NotistackProvider } from './components/NotistackProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GuestRoute from './components/auth/GuestRoute';
import Layout from './components/layout/Layout';

// Pages
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/dashboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Unauthorized from './pages/Unauthorized';
import PageNotFound from './pages/not-found';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotistackProvider>
        <AuthProvider>
          <Routes>
            {/* Guest Routes */}
            <Route
              path="/signin"
              element={
                <GuestRoute>
                  <SignIn />
                </GuestRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRoles={['user', 'admin']}>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute requiredRoles={['user', 'admin']}>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <Layout>
                    <Admin />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Utility Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Default redirect */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </NotistackProvider>
    </ThemeProvider>
  );
}

export default App;