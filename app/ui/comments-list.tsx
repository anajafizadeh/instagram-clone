'use client';

import { useState } from 'react';
import '../globals.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { deepOrange } from '@mui/material/colors';

interface Comment {
  username: string;
  comment: string;
}

interface CommentsListProps {
  open: boolean;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (comment: string) => void;
}

export default function CommentsList({
  open,
  comments,
  onClose,
  onAddComment,
}: CommentsListProps) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) {
      return;
    }

    onAddComment(newComment.trim());
    setNewComment('');
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>Comments</DialogTitle>

      <List sx={{ pt: 0 }}>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {comment.username.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <>
                  <strong>{comment.username}</strong>: {comment.comment}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          padding: 2,
          paddingTop: 0,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Add comment..."
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                },
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleAddComment();
            }
          }}
        />

        <Button sx={{
            borderRadius: '20px', 
            }} variant="contained" 
            onClick={handleAddComment}>
          Post
        </Button>
      </Box>
    </Dialog>
  );
}