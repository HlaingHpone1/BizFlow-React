import { Link } from 'react-router-dom';

import {
  ContactSupportRounded,
  DarkModeRounded,
  Person2Rounded,
  SecurityRounded
} from '@mui/icons-material';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

const SettingSidebar = () => {

  const navbarList = [
    {
      id: 1,
      title: "Personal Information",
      icon: Person2Rounded,
      link: "/settings/personal-info"
    },
    {
      id: 2,
      title: "Privacy & Security",
      icon: SecurityRounded,
      link: "/settings/security"
    },
    {
      id: 3,
      title: "Theme",
      icon: DarkModeRounded,
      link: "/settings/theme"
    },
    {
      id: 4,
      title: "Support & Feedback",
      icon: ContactSupportRounded,
      link: "/settings/support"
    }
  ];

  return (
    <List>
      {navbarList.map((list, index) => (
        <ListItem key={index} disablePadding sx={{
          display: "block",
        }}>
          <Link to={list.link}>
            <ListItemButton sx={{
              padding: "10px 8px",
            }}>
              <ListItemIcon sx={{
                "&.MuiListItemIcon-root": {
                  minWidth: "40px"
                }
              }}>
                <list.icon />
              </ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default SettingSidebar