import 'server-only';

import sql from '../db';
import { Post } from '../types';

export async function getPosts(): Promise<Post[]> {
  const posts = await sql<Post[]>`
    SELECT
      posts.id,
      posts.user_id,
      users.username,
      posts.title,
      posts.description,
      posts.image_url,
      posts.created_at,

      COALESCE(
        (
          SELECT JSON_AGG(like_user.username)
          FROM likes
          JOIN users AS like_user
            ON like_user.id = likes.user_id
          WHERE likes.post_id = posts.id
        ),
        '[]'::JSON
      ) AS likes,

      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', comments.id,
              'username', comment_user.username,
              'comment', comments.comment,
              'created_at', comments.created_at
            )
            ORDER BY comments.created_at
          )
          FROM comments
          JOIN users AS comment_user
            ON comment_user.id = comments.user_id
          WHERE comments.post_id = posts.id
        ),
        '[]'::JSON
      ) AS comments

    FROM posts
    JOIN users
      ON users.id = posts.user_id
    ORDER BY posts.created_at DESC;
  `;

  return posts;
}

export async function getPostById(postId: string): Promise<Post | null> {
  const post = await sql<Post[]>`
    SELECT * FROM posts
    WHERE id = ${postId}
  `;
  return post[0] || null;
}

export async function createPost(
  userId: string,
  title: string,
  description: string | null,
  imageUrl: string
): Promise<Post> {
  const [post] = await sql<Post[]>`
    INSERT INTO posts (user_id, title, description, image_url)
    VALUES (${userId}, ${title}, ${description}, ${imageUrl})
    RETURNING *
  `;
  return post;
}

export async function deletePost(postId: string): Promise<void> {
  await sql`
    DELETE FROM posts
    WHERE id = ${postId}
  `;
}

