'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SidebarProfile from './components/SidebarProfile';
import SidebarPosts from './components/SidebarPosts';
import SidebarPostsReaded from './components/SidebarPostsReaded';
import SidebarCreatePost from './components/SidebarCreatePost';
import SidebarDraftsComponent from './components/SidebarDraftsComponent';
import SidebarFavoritesComponent from './components/SidebarFavoritesComponent';

import { User, Post } from '@/types';
import Loading from '@/components/Loading/loading';

// hooks
import useTheme from '../hooks/useTheme';

interface DashboardClientProps {
  user: User;
  userPosts: Post[];
}

const dashboardSidebarContent = [
  { id: 1, label: 'Profile', icon: '', component: SidebarProfile },
  { id: 2, label: 'Posts', icon: '', component: SidebarPosts },
  { id: 3, label: 'Posts readed', icon: '', component: SidebarPostsReaded },
  { id: 4, label: 'Create', icon: '', component: SidebarCreatePost },
  { id: 5, label: 'Drafts', icon: '', component: SidebarDraftsComponent },
  { id: 6, label: 'Favorites', icon: '', component: SidebarFavoritesComponent },
];

const DashboardClient = ({ user, userPosts }: DashboardClientProps) => {
  const { mode } = useTheme();
  const [activeComponent, setActiveComponent] = useState(0);
  const ActiveSection =
    dashboardSidebarContent.find((section) => section.id === activeComponent)
      ?.component || SidebarProfile;
  console.log(activeComponent);

  console.log('user', user);
  return (
    // <div className={styles.container}>
    //   <h1>Welcome Back ...</h1>
    //   <p>Bienvenue {user.email}</p>
    //   {/* <Posts posts={initialPosts} user={user} /> */}
    //   <p>Post writted</p>
    // </div>
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Sidebar de navigation */}
      <Box
        className={`${mode}`}
        component='aside'
        sx={{
          width: 250,
          height: '100%',
        }}
      >
        <Box sx={{ p: 2 }}>
          <h3>Dashboard</h3>
          <p>Hello, {user.email}</p>
        </Box>
        <Divider />
        <List>
          {dashboardSidebarContent.map(
            (section) => (
              console.log(section),
              (
                <ListItem key={section.id} disablePadding>
                  <ListItemButton
                    selected={activeComponent === section.id}
                    onClick={() => {
                      setActiveComponent(section.id);
                    }}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    <ListItemIcon>{section.icon}</ListItemIcon>
                    <ListItemText primary={section.label} />
                  </ListItemButton>
                </ListItem>
              )
            )
          )}
        </List>
        <Divider />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <ActiveSection user={user} userPosts={userPosts} />
      </Box>
    </Box>
  );
};

export default DashboardClient;
