import 'server-only';

import sql from '../db';
import { Like } from '../types';

export async function getLikesByPostId(postId: string): Promise<Like[]> {
  const likes = await sql<Like[]>`
    SELECT * FROM likes
    WHERE post_id = ${postId}
  `;
  return likes;
}

export async function addLikeToPost(postId: string, userId: string): Promise<Like> {
  const [like] = await sql<Like[]>`
    INSERT INTO likes (post_id, user_id)
    VALUES (${postId}, ${userId})
    RETURNING *
  `;
  return like;
}

export async function removeLikeFromPost(postId: string, userId: string): Promise<void> {
  await sql`
    DELETE FROM likes
    WHERE post_id = ${postId} AND user_id = ${userId}
  `;
}