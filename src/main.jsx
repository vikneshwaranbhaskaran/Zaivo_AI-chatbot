import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'

// 1. Create the Zaivo "Sovereign" Theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
  },
  styles: {
    global: {
      // This ensures the entire browser window stays dark
      body: {
        bg: '#050505',
        color: 'white',
        margin: 0,
        padding: 0,
        overflowX: 'hidden', // Prevents horizontal scroll bugs
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);