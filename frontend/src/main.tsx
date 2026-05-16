import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App.tsx'
import theme from './theme/index.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

export const qC = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5*1000*60,
      refetchOnReconnect: true,
      retry: 2,
      retryDelay: 2*1000*60,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={qC}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
)
