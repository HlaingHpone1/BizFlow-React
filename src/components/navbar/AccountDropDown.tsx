import {
  Menu,
  List,
} from '@mui/material';


import DynamicMenuList, { DynamicMenuListProps } from './DynamicMenuList'
import LogOut from './LogOut';

interface AccountDropDownProps extends DynamicMenuListProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
}

const AccountDropDown = ({ anchorEl, setAnchorEl, openStates, handleClick }: AccountDropDownProps) => {
  return (
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
        <DynamicMenuList openStates={openStates} handleClick={handleClick} />
        <LogOut />
      </List>
    </Menu>
  )
}

export default AccountDropDown
