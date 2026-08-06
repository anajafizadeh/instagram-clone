'use client';
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LabelBottomNavigation() {
  const pathname = usePathname();

  return (
    <BottomNavigation
      className="bottom-navigation"
      value={pathname}
    >
      <BottomNavigationAction
        component={Link}
        href="/"
        label="Home"
        value="/"
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        label="Search"
        value="/search"
        icon={<SearchIcon />}
      />

      <BottomNavigationAction
        component={Link}
        href="/create-post"
        label="New Post"
        value="/create-post"
        icon={<AddIcon />}
      />

      <BottomNavigationAction
        label="Favorites"
        value="/favorites"
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        label="Profile"
        value="/profile"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}