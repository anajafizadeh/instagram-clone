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

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation className="bottom-navigation" value={value} onChange={handleChange}>
      <Link href="/" passHref>
        <BottomNavigationAction
          label="Home"
          value="Home"
          icon={<HomeIcon />}
        />
      </Link>
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
      <Link href="/create-post" passHref>
        <BottomNavigationAction
          label="New Post"
          value="add"
          icon={<AddIcon />} 
        />
      </Link>
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />} 
        />
    </BottomNavigation>
  );
}
