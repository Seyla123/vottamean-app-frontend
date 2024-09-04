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
    // Define other typography settings as needed
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
