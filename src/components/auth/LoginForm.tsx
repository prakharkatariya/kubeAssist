import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

const schema = zod.object({
  domainId: zod.string().min(5, { message: 'Domain ID must be at least 5 characters' }),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

function LoginForm() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      domainId: '',
      password: '',
    }
  });

  const onSubmit = async (values: Values): Promise<void> => {
    setIsPending(true);
    
    try {
      console.log('Login values:', values);
      
      // TODO: Replace with actual API call
      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login - replace with actual API response
      const mockAccessToken = 'mock-access-token';
      const mockSessionId = 'mock-session-id';
      
      await handleLogin(mockAccessToken, mockSessionId);
      
    } catch (error: any) {
      setError('root', { 
        type: 'server', 
        message: error?.message || 'Login failed. Please try again.' 
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 4,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={1} alignItems="center">
            <Typography variant="h4" component="h1" fontWeight="bold">
              Sign in
            </Typography>
            <Typography color="text.secondary" variant="body2" textAlign="center">
              Enter your credentials to access Kube Assist
            </Typography>
          </Stack>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                control={control}
                name="domainId"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.domainId)} fullWidth>
                    <InputLabel>Domain ID</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Domain ID"
                      type="text"
                      placeholder="Enter your domain ID"
                    />
                    {errors.domainId && (
                      <FormHelperText>{errors.domainId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)} fullWidth>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              
              {errors.root && (
                <Alert severity="error">{errors.root.message}</Alert>
              )}
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isPending}
                fullWidth
                sx={{
                  height: 48,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign in'
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm;