import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AuthProvider } from './context/AuthProvider.jsx'
import App from './App.jsx'
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
