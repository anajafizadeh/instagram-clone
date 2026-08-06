'use client';

import { useActionState } from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { authenticate } from '@/app/lib/actions/auth';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: 600,
        }}
      >
        Welcome back
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Log in to continue.
      </Typography>

      <Box
        component="form"
        action={formAction}
      >
        <Stack spacing={2}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            required
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {errorMessage && (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center" }}
          >
            Don&apos;t have an account?{' '}
            <a href="/signup">
              Sign up
            </a>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}