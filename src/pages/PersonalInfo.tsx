import React from 'react'
import SettingPaper from '../layouts/SettingPaper'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Info = ({ field, name }: { field: string, name: string }) => {

  return (
    <>
      <Box display="flex" alignItems="center" gap="15px">
        <Typography variant="h6" sx={{
          fontSize: "1.2rem",
          fontWeight: 700,
          fontFamily: "Roboto Slab Variable"
        }}>{field}</Typography>
        <Typography sx={{
          fontFamily: "Roboto Slab Variable"
        }}
        >
          {name}
        </Typography>
      </Box>
    </>
  )
}

const PersonalInfo = () => {
  return (
    <>
      <SettingPaper>
        <Typography component="h2" variant="h4" marginBottom={0.5} sx={{
          fontWeight: 700,
          fontFamily: "Roboto Slab Variable"
        }}>
          Personal Information
        </Typography>
        <Typography paragraph marginBottom={2}>
          Manage your personal information, such as your name and email address.
        </Typography>

        <Info field='User Name' name='Hlaing Hpone' />
        <Info field='Email' name='hlainghpone@gmail.com' />
        <Info field='Subscription' name='Free' />

        <Stack width="25%" gap={3} >
          <Button variant='outlined' color='info'>
            Change User Name
          </Button>

          <Button variant='outlined' color='info'>
            Change Email
          </Button>

          <Button variant='outlined' color='error'>Disable Account</Button>

        </Stack>

      </SettingPaper>
    </>
  )
}

export default PersonalInfo