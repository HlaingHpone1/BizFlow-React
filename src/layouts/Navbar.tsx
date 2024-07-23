import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Drawer,
  List,
  useMediaQuery,
} from '@mui/material';

import {
  Search,
  AccountCircle,
  MenuRounded,
} from '@mui/icons-material';


import { images } from "../utils/image"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarItems from '../components/navbar/NavbarItems';
import SideBarDrawer from '../components/navbar/SideBarDrawer';
import AccountDropDown from '../components/navbar/AccountDropDown';
import { useTheme } from '@mui/material/styles';
import ContainerWraper from './ContainerWraper';
export interface OpenStates {
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


const Navbar = () => {

  const [open, setOpen] = useState(false);

  const [openStates, setOpenStates] = useState<OpenStates>({
    Account: false,
    System: false,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [matches]);

  const handleClick = (key: keyof OpenStates) => {
    setOpenStates({
      ...openStates,
      [key]: !openStates[key]
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: 'primary.main' }}>
        <ContainerWraper >
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
              <List>
                <NavbarItems />
              </List>

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
              <SideBarDrawer setOpen={setOpen} openStates={openStates} handleClick={handleClick} />
            </Drawer>
          </Toolbar>
        </ContainerWraper>
      </AppBar>
      <AccountDropDown anchorEl={anchorEl} setAnchorEl={setAnchorEl} openStates={openStates} handleClick={handleClick} />
    </Box>
  );
}

export default Navbar
