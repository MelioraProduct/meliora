import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Input,
  Button,
  Link,
  Divider,
  Alert,
} from '@mui/joy';
import { Google as GoogleIcon } from '@mui/icons-material';
import { signIn } from '../../redux/reducers/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signIn({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography level="h2" component="h1">
          Sign In
        </Typography>
        
        {error && (
          <Alert color="danger" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" color="primary" fullWidth>
            Sign In
          </Button>
        </Box>

        <Divider>or</Divider>

        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<GoogleIcon />}
          fullWidth
        >
          Sign in with Google
        </Button>

        <Box sx={{ mt: 2 }}>
          <Typography level="body-sm">
            Don't have an account?{' '}
            <Link
              component="button"
              onClick={() => navigate('/signup')}
              color="primary"
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn; 