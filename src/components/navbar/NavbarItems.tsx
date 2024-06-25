import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import {
  Notifications,
  BusinessCenter,
  Message,
  Diversity2,
  HomeRounded,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface NavbarItemsProps {
  isSideBar?: boolean;
}

const NavbarItems = ({ isSideBar }: NavbarItemsProps) => {
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

  return (
    <>
      {
        navbarList.map((list, i) =>
          isSideBar ? (
            <ListItem disablePadding key={i}>
              <Link to={list.link} className='block w-full'>
                <ListItemButton >
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
            <IconButton key={i} color="inherit">
              <Link to={list.link}>
                <list.icon sx={{
                  fontSize: "30px",
                }} />
              </Link>
            </IconButton>
          )
        )
      }
    </>

  )
}

export default NavbarItems
