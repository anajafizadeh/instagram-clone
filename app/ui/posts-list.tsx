'use client';

import react, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../globals.css";
import CommentsList from "./comments-list";

export default function PostsList({ posts }: { posts: any[] }) {
  const [postList, setPostList] = useState(posts);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<number | null>(
    null
  );

  function countLikes(post: any) {
    return post.likes.length;
  }

  function countComments(post: any) {
    return post.comments.length;
  }

  const handleLike = (postId: number) => {
    setPostList((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const isLiked = post.likes.includes("current_user");

        return {
          ...post,
          likes: isLiked
            ? post.likes.filter(
                (username: string) => username !== "current_user"
              )
            : [...post.likes, "current_user"],
        };
      })
    );
  };

  const handleComment = (postId: number) => {
    setOpenCommentsPostId(postId);
  };

  const handleCloseComments = () => {
    setOpenCommentsPostId(null);
  };

  const handleAddComment = (comment: string) => {
    if (openCommentsPostId === null) {
        return;
    }

    setPostList((currentPosts) =>
        currentPosts.map((post) =>
        post.id === openCommentsPostId
            ? {
                ...post,
                comments: [
                ...post.comments,
                {
                    username: 'current_user',
                    comment,
                },
                ],
            }
            : post
        )
    );
  };

  const selectedPost = postList.find(
    (post) => post.id === openCommentsPostId
  );

  return (
    <>
      <Box
        className="mt-2.5"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {postList.map((post) => {
          const isLiked = post.likes.includes("current_user");

          return (
            <Card
              key={post.id}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <div className="flex items-center">
                <Avatar
                  className="m-1.5"
                  sx={{
                    bgcolor: deepOrange[500],
                    width: 30,
                    height: 30,
                  }}
                >
                  {post.username?.charAt(0).toUpperCase() || "U"}
                </Avatar>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: 400, marginLeft: 1 }}
                >
                  {post.username || "Username"}
                </Typography>
              </div>

              <CardMedia
                component="img"
                height="200"
                width="100%"
                image={post.image}
                alt={post.title}
                className="object-cover image-container"
              />

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <IconButton
                    className={`like-button-${post.id}`}
                    aria-label="Like post"
                    onClick={() => handleLike(post.id)}
                  >
                    {isLiked ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginRight: 1 }}
                  >
                    {countLikes(post)}
                  </Typography>

                  <IconButton
                    className={`comment-button-${post.id}`}
                    aria-label="Show comments"
                    onClick={() => handleComment(post.id)}
                  >
                    <MapsUgcRoundedIcon />
                  </IconButton>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginRight: 1 }}
                  >
                    {countComments(post)}
                  </Typography>
                </div>
              </div>

              <CardContent>
                <Typography variant="h6">{post.title}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <CommentsList
        open={openCommentsPostId !== null}
        comments={selectedPost?.comments || []}
        onClose={handleCloseComments}
        onAddComment={handleAddComment}
      />
    </>
  );
}