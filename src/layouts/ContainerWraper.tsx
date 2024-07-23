import { Container } from '@mui/material'
import React from 'react'

type ContainerWraperProp = {
  children: React.ReactNode;
}

// This Container max-width = 1280px
// It's used to wrap the content of the pages, Navbar, and Footer.
const ContainerWraper = ({ children }: ContainerWraperProp) => {
  return (
    <Container maxWidth="lg">
      {children}
    </Container>
  )
}

export default ContainerWraper