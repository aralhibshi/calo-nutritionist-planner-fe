import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#57AE7F',
      light: '#B3DBC5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#33FF57'
    }
  },
  typography: {
    allVariants: {
      letterSpacing: '1.5px'
    },
    fontFamily: [
      'Bebas Neue',
      'sans-serif'
    ].join(','),
  },
  transitions: {
    duration: {
      enteringScreen: 300,
      leavingScreen: 300
    } 
  }
});

export default theme;