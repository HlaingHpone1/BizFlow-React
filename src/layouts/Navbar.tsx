
import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Container,
  Collapse,
} from '@mui/material';

import {
  Search,
  AccountCircle,
  Notifications,
  BusinessCenter,
  Message,
  Diversity2,
  HomeRounded,
  MenuRounded,
  Person,
  Settings,
  Logout,
  ExpandLess,
  ExpandMore,
  Apps
} from '@mui/icons-material';


import { images } from "../utils/image"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userStore } from '../store/userStore';


interface OpenStates {
  Account: boolean;
  System: boolean;
}

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 2),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
  },
}));

const navbarList = [
  {
    id: 1,
    title: "Home",
    icon: HomeRounded,
    link: "/"
  },
  {
    id: 2,
    title: "Network",
    icon: Diversity2,
    link: "/network"
  },
  {
    id: 3,
    title: "Message",
    icon: Message,
    link: "/message"
  },
  {
    id: 4,
    title: "Notification",
    icon: Notifications,
    link: "/notification"
  },
  {
    id: 5,
    title: "Job",
    icon: BusinessCenter,
    link: "/job"
  }
];

const mobileSidebarList = [
  {
    id: 5,
    title: "Account",
    icon: AccountCircle,
    link: "/",
    children: [
      {
        id: 6,
        title: "Profile",
        icon: Person,
        link: "/profile"
      },
    ]
  },
  {
    id: 7,
    title: "System",
    icon: Apps,
    link: "/",
    children: [
      {
        id: 8,
        title: "Setting",
        icon: Settings,
        link: "/setting"
      },
    ]
  },
]

const DropDownList = ({ openStates, handleClick }: { openStates: OpenStates, handleClick: (key: keyof OpenStates) => void }) => {

  return (
    <>
      {
        mobileSidebarList.map((list, i) =>
          !openStates.hasOwnProperty(list.title) ? (
            <ListItem disablePadding key={i}>
              <Link to={list.link}>
                <ListItemButton
                >
                  <ListItemIcon>
                    <list.icon sx={{
                      fontSize: "25px",
                    }} />
                  </ListItemIcon>
                  <ListItemText primary={list.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ) : (
            <ListItem disablePadding key={i}>
              <Box className='block w-full' >
                <ListItemButton sx={{
                  justifyContent: "space-between",
                  transition: "background-color 0.3s ease"
                }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick(list.title as keyof OpenStates);
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <ListItemIcon>
                      <list.icon sx={{
                        fontSize: "25px",
                      }} />
                    </ListItemIcon>
                    <ListItemText primary={list.title} />
                  </Box>

                  {Object.keys(openStates).includes(list.title) && (
                    openStates[list.title as keyof OpenStates] ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={openStates[list.title as keyof OpenStates]}
                  timeout="auto"
                >
                  <List disablePadding>
                    {
                      list.children?.map((child, i) =>
                        <ListItem key={i} sx={{
                          padding: "0px",
                          paddingX: "10px"
                        }}
                        >
                          <Link to={child.link} className='block w-full'>
                            <ListItemButton>
                              <ListItemIcon>
                                <child.icon sx={{
                                  fontSize: "25px",
                                }} />
                              </ListItemIcon>
                              <ListItemText primary={child.title} />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      )
                    }
                  </List>
                </Collapse>
              </Box>
            </ListItem>
          )
        )
      }
    </>

  )
}

const Navbar = () => {
  const { logOut } = userStore();

  const [open, setOpen] = useState(false);
  const [openStates, setOpenStates] = useState<OpenStates>({
    Account: false,
    System: false,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (key: keyof OpenStates) => {
    setOpenStates({
      ...openStates,
      [key]: !openStates[key]
    })
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="profile-popup"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}

    >
      <List sx={{
        width: "200px"
      }}
        disablePadding
      >
        <DropDownList openStates={openStates} handleClick={handleClick} />

        <ListItem disablePadding>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <Logout sx={{
                fontSize: "25px",
              }} />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Menu>
  );

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(!open)}>
      <List>
        {
          navbarList.map((list, i) =>
            <ListItem disablePadding key={i}>
              <Link to={list.link} className='block w-full'>
                <ListItemButton>
                  <ListItemIcon>
                    <list.icon sx={{
                      fontSize: "25px",
                    }} />
                  </ListItemIcon>
                  <ListItemText primary={list.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        }
      </List>
      <Divider />
      <List>
        <DropDownList openStates={openStates} handleClick={handleClick} />

        <ListItem disablePadding>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <Logout sx={{
                fontSize: "25px",
              }} />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>

    </Box >

  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Container maxWidth="lg" >
          <Toolbar sx={{
            minHeight: {
              xs: "85px"
            },
          }}>
            <Link to="/">
              <Box
                component="img"
                src={images.logoWhite}
                sx={{
                  width: "65px",
                }}
              />
            </Link>
            <SearchBox>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchBox>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {
                navbarList.map((list, i) =>
                  <IconButton key={i} color="inherit">
                    <Link to={list.link}>
                      <list.icon sx={{
                        fontSize: "30px",
                      }} />
                    </Link>
                  </IconButton>
                )
              }
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-popup"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <AccountCircle sx={{
                  fontSize: "50px",
                }} />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
                color="inherit"
              >
                <MenuRounded sx={{
                  fontSize: "40px",
                }}
                />
              </IconButton>
            </Box>

            <Drawer open={open} anchor={'right'} onClose={() => setOpen(false)}>
              {DrawerList}
            </Drawer>

          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default Navbar
