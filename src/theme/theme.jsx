import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E35B1', // Deep purple
      light: '#7E57C2',
      dark: '#4527A0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2979FF', // Electric blue
      light: '#448AFF',
      dark: '#2962FF',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF5722', // Energetic orange
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #5E35B1 30%, #7E57C2 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #2979FF 30%, #448AFF 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
