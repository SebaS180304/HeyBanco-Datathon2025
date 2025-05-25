import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A9DFD8',         // Color principal (botones, acentos)
      contrastText: '#171821', // Texto en botones (fondo claro)
    },
    secondary: {
        main: '#171821',
        contrastText: '#FFF', // Texto en botones (fondo oscuro)
    },
    background: {
      default: '#171821',      // Fondo de página
      paper: '#21222D',        // Fondos de tarjetas, formularios
    },
    text: {
      primary: '#FFFFFF',      // Texto principal
      secondary: '#BDBDBD',    // Placeholder, labels
      disabled: '#8C8C8C',     // Texto inactivo
    },
    divider: '#2E303C',        // Líneas sutiles
    icon: {
      primary: '#21222D',      // Íconos sobre fondo claro
      secondary: '#A9DFD8 ',    // Íconos sobre fondo oscuro
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FFA726',
    },
    info: {
      main: '#29B6F6',
    },
    success: {
      main: '#66BB6A',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          overflowX: 'hidden',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#21222D',
        },
      },
    },
  },
});

export default theme;
