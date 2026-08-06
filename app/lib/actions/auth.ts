'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { getUserByEmail, getUserByUsername } from '../queries/users';
import sql from '../db';

const SignupSchema = z
  .object({
    username: z.string().trim().min(3, 'Username must be at least 3 characters.'),
    email: z.string().trim().email('Enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type SignupState = {
  error?: string;
};

export async function signup(
  previousState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.issues[0]?.message ??
        'Invalid signup information.',
    };
  }

  const { username, email, password } = validatedFields.data;

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return {
      error: 'An account with this email already exists.',
    };
  }

  const existingUsername = await getUserByUsername(username);

  if (existingUsername) {
    return {
      error: 'Username is already taken.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (
      username,
      email,
      password,
      avatar_url
    )
    VALUES (
      ${username},
      ${email},
      ${hashedPassword},
      ${null}
    )
  `;

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/',
  });

  return {};
}

export async function authenticate(
  previousState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';

        default:
          return 'Something went wrong. Please try again.';
      }
    }

    throw error;
  }
}