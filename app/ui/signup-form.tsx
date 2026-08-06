'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { signup, SignupState } from '@/app/lib/actions/auth';

const initialState: SignupState = {};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signup,
    initialState
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
        Create an account
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Sign up to start sharing posts.
      </Typography>

      <Box component="form" action={formAction}>
        <Stack spacing={2}>
          <TextField
            name="username"
            label="Username"
            required
            fullWidth
          />

          <TextField
            name="email"
            type="email"
            label="Email"
            required
            fullWidth
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            required
            fullWidth
          />

          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm password"
            required
            fullWidth
          />

          {state.error && (
            <Alert severity="error">
              {state.error}
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
            {isPending ? 'Creating account...' : 'Sign up'}
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: "center" }}
          >
            Already have an account?{' '}
            <Link href="/login">
              Log in
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}