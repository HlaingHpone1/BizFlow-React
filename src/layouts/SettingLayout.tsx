import React, { useEffect } from 'react'

import {
  ChevronLeftRounded,
  ChevronRightRounded,
  MenuRounded,
} from '@mui/icons-material';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material'

import { useTheme } from '@mui/material/styles';
import SettingSidebar from '../components/settings/SettingSidebar';

const drawerWidth = 210;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'space-around',
}));

import { Outlet } from 'react-router-dom'

const SettingLayout = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [matches]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {
          !open && (
            <Toolbar
              sx={{
                display: {
                  xs: 'block',
                  sm: 'none',
                }
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  pt: 2
                }}
              >
                <MenuRounded />
              </IconButton>
            </Toolbar>
          )
        }
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6" component="h6">
              Settings
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftRounded /> : <ChevronRightRounded />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <SettingSidebar />
        </Drawer>

        <Main open={open} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem"
        }}>
          <Box sx={{
            width: "20%",
            display: {
              xs: "none",
              sm: "block"
            },
          }}>
            <SettingSidebar />
          </Box>
          <Box sx={{
            width: {
              xs: "100%",
              sm: "80%"
            },
          }}>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </>
  )
}

export default SettingLayout