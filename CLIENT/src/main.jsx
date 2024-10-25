import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './config/queryClient.js'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import muiTheme from './global/theme/muiTheme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <Router>
          <Toaster
            position="bottom-left"
            reverseOrder={false}
          />
          <App />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
