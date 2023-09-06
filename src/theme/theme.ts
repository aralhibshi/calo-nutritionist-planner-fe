import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#57AE7F',
      light: '#B3DBC5',
      contrastText: '#FFFFFF'
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
  }
});

export default theme;