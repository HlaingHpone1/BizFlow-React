import { ThemeProvider } from '@emotion/react'
import "@fontsource/roboto";
import "@fontsource-variable/roboto-slab"
import { alpha, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import { createTheme } from '@mui/material/styles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const MainLayout = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: alpha("#1A5DB4", 0.85),
        light: alpha("#1A5DB4", 0.5),
        dark: alpha("#1A5DB4", 0.9),
      },
      secondary: {
        main: "#D4F1F4",
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        'Roboto Slab Variable',
        'sans-serif',
        'Arial',
      ].join(','),
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Outlet />
        <Footer />
        <ReactQueryDevtools />

      </ThemeProvider>
    </>
  )
}

export default MainLayout
