import 'server-only';

import sql from '../db';
import { User } from '../types';

export async function getUserById(userId: string): Promise<User | null> {
  const user = await sql<User[]>`
    SELECT * FROM users
    WHERE id = ${userId}
  `;
  return user[0] || null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const user = await sql<User[]>`
    SELECT * FROM users
    WHERE username = ${username}
  `;
  return user[0] || null;
}

export async function createUser(
  username: string,
  email: string,
  avatarUrl: string | null
): Promise<User> {
  const [user] = await sql<User[]>`
    INSERT INTO users (username, email, avatar_url)
    VALUES (${username}, ${email}, ${avatarUrl})
    RETURNING *
  `;
  return user;
}

export async function deleteUser(userId: string): Promise<void> {
  await sql`
    DELETE FROM users
    WHERE id = ${userId}
  `;
}