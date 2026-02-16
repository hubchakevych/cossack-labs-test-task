import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LoginPage } from '@/pages/auth/ui'
import { HomePage } from '@/pages/home/ui'
import { PagesPaths } from '@/shared/config'

import { MainLayout } from '../entrypoint/MainLayout'
import { ProtectedLayout } from '../entrypoint/ProtectedLayout'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PagesPaths.Auth} element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route element={<MainLayout />}>
            <Route path={PagesPaths.Home} element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
