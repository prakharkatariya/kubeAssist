import React from 'react';
import { Box, Typography, Paper, Avatar, Chip, Stack } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
              {user.displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5">{user.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Domain ID
                </Typography>
                <Typography variant="body1">{user.domainId}</Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Role
                </Typography>
                <Chip 
                  label={user.role.toUpperCase()} 
                  color={user.role === 'admin' ? 'error' : 'primary'}
                  size="small"
                />
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Permissions
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {user.permissions.map((permission) => (
                    <Chip
                      key={permission}
                      label={permission}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;