import { useContext } from 'react';
import { Box, Switch, Typography } from '@mui/material'

import SettingPaper from '../layouts/SettingPaper'
import { DarkThemeContext } from '../context/DarkThemeContext';

const Theme = () => {

  const { isDarkTheme, setIsDarkTheme } = useContext(DarkThemeContext);

  return (
    <>
      <SettingPaper>
        <Box display="flex" alignItems="center" gap={1}>
          <Switch checked={isDarkTheme} onChange={() => setIsDarkTheme(!isDarkTheme)} />
          <Typography component="h3" variant='h5'>
            Dark Mode
          </Typography>
        </Box>
      </SettingPaper>
    </>
  )
}

export default Theme