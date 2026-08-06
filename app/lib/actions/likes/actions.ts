'use server';

import {
  addLikeToPost,
  removeLikeFromPost,
} from '../../queries/likes';

export async function toggleLikeAction(
  postId: string,
  userId: string,
  isCurrentlyLiked: boolean
) {
  if (isCurrentlyLiked) {
    await removeLikeFromPost(postId, userId);
    return { liked: false };
  }

  await addLikeToPost(postId, userId);
  return { liked: true };
}