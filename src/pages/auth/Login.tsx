import React from 'react';
import { Box } from '@mui/material';
import CarelonLogo from '@/assets/images/logo_carelon_text.png';
import LoginForm from '@components/auth/LoginForm';

function Login() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        position: 'relative',
      }}
    >
      {/* Logo positioned at top */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 1,
        }}
      >
        <img
          src={CarelonLogo}
          alt="Carelon Logo"
          style={{
            height: '32px',
          }}
        />
      </Box>
      
      {/* Login Form */}
      <LoginForm />
    </Box>
  );
}

export default Login;