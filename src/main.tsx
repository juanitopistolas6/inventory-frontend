import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/auth-context.tsx'
import { CartProvider } from './context/cart-context.tsx'
import { ProdctProvider } from './context/products-context.tsx'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <AuthProvider>
      <CartProvider>
        <ProdctProvider>
          <App />
        </ProdctProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
)
