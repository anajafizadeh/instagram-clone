'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { createPostAction } from '../create-post/actions';

export default function CreatePostForm() {
    const userId = '10000000-0000-0000-0000-000000000001';
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
            }}
            >
            Create Post
        </Typography>

        <Box
          component="form"
          action={async (formData) => {
            await createPostAction(formData);
          }}
        >
          <input type="hidden" name="userId" value={userId} />

          <Stack spacing={2}>
            <TextField
              label="Title"
              id="title"
              name="title"
              required
              fullWidth
            />

            <TextField
              label="Description"
              id="description"
              name="description"
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              label="Image URL"
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Create Post
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}