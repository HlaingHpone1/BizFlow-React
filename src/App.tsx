import {
  alpha,
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'

import "@fontsource/roboto";
import "@fontsource-variable/roboto-slab"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Router from './router/Router'
import AlertBox from './components/alertBox/AlertBox';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // Data is fresh for 2 minutes
      refetchIntervalInBackground: true,
    }
  }
});

const App: React.FC = () => {

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
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Router />
          <AlertBox />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App
