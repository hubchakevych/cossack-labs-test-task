import { makeAutoObservable } from 'mobx'

import { authApi } from '@/shared/api'
import { parseBackendError } from '@/shared/lib/parseBackendError'

import { currentUserStore } from './currentUserStore'

const ACCESS_TOKEN_KEY = 'accessToken'

export class AuthStore {
  loading = false
  accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY)
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isAuthenticated(): boolean {
    return Boolean(this.accessToken)
  }

  login = async (username: string, password: string): Promise<void> => {
    this.loading = true
    this.error = null

    try {
      const { data } = await authApi.login({ username, password })

      this.accessToken = data.accessToken
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
    } catch (err) {
      this.error = parseBackendError(err)
    } finally {
      this.loading = false
    }
  }

  logout = (): void => {
    this.accessToken = null
    this.error = null
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    currentUserStore.clearUser()
  }
}

export const authStore = new AuthStore()
