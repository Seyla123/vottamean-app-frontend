import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material/styles';

// Define the theme
let theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      disabled: '#9E9E9E',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    // Define other typography settings as needed
    h4:{
      fontSize: '32px',
    }
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
