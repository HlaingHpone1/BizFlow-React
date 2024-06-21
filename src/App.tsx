import Router from './router/Router'
import { alpha, createTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@mui/material'
import "@fontsource/roboto";
import "@fontsource-variable/roboto-slab"
import { TypographyOptions } from '@mui/material/styles/createTypography';

interface CustomThemeOptions extends ThemeOptions {
  typography?: TypographyOptions;
}

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
  } as CustomThemeOptions)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
