'use server';

import { createPost } from '../lib/queries/posts';

export async function createPostAction(formData: FormData) {
  const userId = formData.get('userId') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;

  return createPost(userId, title, description, imageUrl);
}