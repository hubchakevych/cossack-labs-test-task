import { Theme } from '@radix-ui/themes'
import { createRoot } from 'react-dom/client'

import { AppRouter } from '../routes'
import { authStore } from '../store/authStore'

import '@/app/styles/global.css'

authStore.setupAuthRefreshHandler()

createRoot(document.getElementById('root')!).render(
  <Theme>
    <AppRouter />
  </Theme>,
)
