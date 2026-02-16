import { observer } from 'mobx-react-lite'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { authStore } from '@/app/store'
import { PagesPaths } from '@/shared/config'

const ProtectedLayoutInner = () => {
  const location = useLocation()

  if (!authStore.isAuthenticated) {
    return <Navigate to={PagesPaths.Auth} state={{ from: location }} replace />
  }
  return <Outlet />
}

export const ProtectedLayout = observer(ProtectedLayoutInner)

