import 'server-only';

import sql from '../db';
import { Comment } from '../types';

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      users.username,
      comments.comment,
      comments.created_at
    FROM comments
    JOIN users ON users.id = comments.user_id
    WHERE comments.post_id = ${postId}
    ORDER BY comments.created_at;
  `;

  return comments;
}

export async function addCommentToPost(
  postId: string,
  userId: string,
  commentText: string
): Promise<Comment> {
  const [comment] = await sql<Comment[]>`
    INSERT INTO comments (post_id, user_id, comment)
    VALUES (${postId}, ${userId}, ${commentText})
    RETURNING *;
  `;

  return comment;
}

export async function deleteComment(commentId: string): Promise<void> {
  await sql`
    DELETE FROM comments
    WHERE id = ${commentId}
  `;
}