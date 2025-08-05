import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'grey.50',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button variant="contained" onClick={handleGoHome}>
            Go to Dashboard
          </Button>
          <Button variant="text" onClick={handleLogout} color="error">
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Unauthorized;