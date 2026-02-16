import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { HomePage } from '@/pages/home/ui/Page'

import '@/app/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
