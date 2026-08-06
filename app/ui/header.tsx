'use client';
import * as React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { signOut } from 'next-auth/react';

export default function Header() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/login',
    });
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          width: '100%',
        }}
      >
        <Box sx={{ justifySelf: 'start' }}>
          <IconButton aria-label="Log out" value="logout" onClick={handleSignOut}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>

        <Typography
          component="h1"
          variant="h6"
          sx={{
            justifySelf: 'center',
            fontWeight: 700,
          }}
        >
          Instagram
        </Typography>

        <Box sx={{ justifySelf: 'end' }}>
          <IconButton aria-label="Open inbox">
            <InboxIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}