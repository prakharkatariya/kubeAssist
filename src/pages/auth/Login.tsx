import React from 'react';
import { Box } from '@mui/material';
import CarelonLogo from '@/assets/images/logo_carelon_text.png';
import LoginForm from '@components/auth/LoginForm';

function Login() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: 'grey.50',
      }}
    >
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
            maxWidth: '200px',
            objectFit: 'contain',
          }}
        />
      </Box>
      <LoginForm />
    </Box>
  );
}

export default Login;