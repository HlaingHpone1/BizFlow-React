import {
  Box,
  Divider,
  List
} from "@mui/material"

import LogOut from "./LogOut"
import NavbarItems from "./NavbarItems"
import DynamicMenuList, { DynamicMenuListProps } from "./DynamicMenuList"

interface SideBarDrawerProps extends DynamicMenuListProps {
  setOpen: (open: boolean) => void;
}

const SideBarDrawer = ({ setOpen, openStates, handleClick }: SideBarDrawerProps) => {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(!open)}>
      <NavbarItems isSideBar={true} />
      <Divider />
      <List>
        <DynamicMenuList openStates={openStates} handleClick={handleClick} />
        <LogOut />
      </List>
    </Box >
  )
}

export default SideBarDrawer
