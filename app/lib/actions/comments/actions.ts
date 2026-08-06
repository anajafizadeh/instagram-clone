'use server';

import { addCommentToPost } from '../../queries/comments';

export async function addCommentAction(
  postId: string,
  userId: string,
  comment: string
) {
  return addCommentToPost(postId, userId, comment);
}