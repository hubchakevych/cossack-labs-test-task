import { makeAutoObservable } from 'mobx'

import { userApi } from '@/entities/user/api'
import type { AuthUser } from '@/shared/api/auth/types'
import { parseBackendError } from '@/shared/lib/parseBackendError'

export class CurrentUserStore {
  currentUser: AuthUser | null = null
  loading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this, {
      getCurrentUser: false,
    })
  }

  getCurrentUser = async (): Promise<void> => {
    this.startLoading()
    try {
      const response = await userApi.getMe()
      this.setSuccess(response.data)
    } catch (err) {
      this.setFailure(parseBackendError(err))
    }
  }

  clearUser = (): void => {
    this.currentUser = null
    this.error = null
  }

  private startLoading = (): void => {
    this.loading = true
    this.error = null
  }

  private setSuccess = (user: AuthUser): void => {
    this.currentUser = user
    this.loading = false
  }

  private setFailure = (message: string): void => {
    this.error = message
    this.currentUser = null
    this.loading = false
  }
}

export const currentUserStore = new CurrentUserStore()
