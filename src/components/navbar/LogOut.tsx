import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { Logout } from '@mui/icons-material';

import { userStore } from '../../store/userStore';

const LogOut = () => {
  const { logOut } = userStore();

  return (
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
  )
}

export default LogOut
