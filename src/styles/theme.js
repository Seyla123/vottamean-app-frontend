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
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    body1: {
      fontSize: '16px',
      '@media (max-width:600px)': {
        fontSize: '12px',
      },
    },
    // Define other typography settings as needed
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
