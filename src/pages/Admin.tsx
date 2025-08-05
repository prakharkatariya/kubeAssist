import React from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Admin: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Welcome to the admin panel, {user?.displayName}!
      </Alert>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Admin Features
        </Typography>
        <Typography variant="body1">
          This is a protected admin-only page. Only users with the 'admin' role can access this content.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Admin;