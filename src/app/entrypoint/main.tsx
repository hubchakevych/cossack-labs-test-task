import { Theme } from '@radix-ui/themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppRouter from '../routes/AppRouter'

import '@/app/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <AppRouter />
    </Theme>
  </StrictMode>,
)
