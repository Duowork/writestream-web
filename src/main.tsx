import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { RoofProvider } from 'react-roof'

import { BrowserRouter } from 'react-router-dom'

/* -------------------------------------------- */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoofProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </RoofProvider>
  </StrictMode>,
)