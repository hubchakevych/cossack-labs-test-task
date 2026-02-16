import { useCallback, useEffect } from 'react'

import { authStore, currentUserStore } from '@/app/store'

export const useGetCurrentUser = () => {
  const { currentUser, loading } = currentUserStore
  const { isAuthenticated } = authStore

  useEffect(() => {
    if (isAuthenticated && !currentUser && !loading) {
      void currentUserStore.getCurrentUser()
    }
  }, [isAuthenticated, currentUser, loading])

  const handleLogout = useCallback(() => {
    authStore.logout()
  }, [])

  return { handleLogout, currentUserStore }
}
