import { makeAutoObservable } from 'mobx'

import { userApi } from '@/entities/user/api'
import type { AuthUser } from '@/shared/api'
import { parseBackendError } from '@/shared/lib/parseBackendError'

export class CurrentUserStore {
  currentUser: AuthUser | null = null
  loading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  getCurrentUser = async (): Promise<void> => {
    this.loading = true
    this.error = null

    try {
      const { data } = await userApi.getMe()
      this.currentUser = data
    } catch (err) {
      this.error = parseBackendError(err)
      this.currentUser = null
    } finally {
      this.loading = false
    }
  }

  clearUser = (): void => {
    this.currentUser = null
    this.error = null
  }
}

export const currentUserStore = new CurrentUserStore()
