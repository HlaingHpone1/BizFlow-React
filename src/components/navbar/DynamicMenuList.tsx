import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';

import {
  ExpandLess,
  ExpandMore,
  Person,
  Settings,
  Apps,
  AccountCircle,
} from '@mui/icons-material';


import { Link } from 'react-router-dom';
import { OpenStates } from '../../layouts/Navbar';


export interface DynamicMenuListProps {
  openStates: OpenStates;
  handleClick: (key: keyof OpenStates) => void;
}

const DynamicMenuList = ({ openStates, handleClick }: DynamicMenuListProps) => {

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

export default DynamicMenuList;