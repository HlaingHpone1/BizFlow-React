import { useContext } from 'react';
import { ThemeProvider } from '@emotion/react'

import "@fontsource/roboto";
import "@fontsource-variable/roboto-slab"

import { createTheme } from '@mui/material/styles';
import { alpha, CssBaseline } from '@mui/material';

import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Navbar from './Navbar';
import Footer from './Footer';

import { DarkThemeContext } from '../context/DarkThemeContext';
import ContainerWraper from './ContainerWraper';

const MainLayout = () => {

  const { isDarkTheme } = useContext(DarkThemeContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: alpha("#1A5DB4", 1),
        light: alpha("#1A5DB4", 0.9),
      },
      secondary: {
        main: "#D4F1F4",
      },
      mode: isDarkTheme ? "dark" : "light",
    },
    typography: {
      fontFamily: [
        'Roboto',
        'Roboto Slab Variable',
        'sans-serif',
        'Arial',
      ].join(','),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 960,
        lg: 1280,
        xl: 1920,
      }
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <ContainerWraper>
          <Outlet />
        </ContainerWraper>
        <Footer />
        <ReactQueryDevtools />

      </ThemeProvider>
    </>
  )
}

export default MainLayout
