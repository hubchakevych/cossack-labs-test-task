import type { InternalAxiosRequestConfig } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

import { authApi } from '@/shared/api/auth/auth'
import {
  ApiRoutes,
  setAuthErrorHandler,
  setAuthRefreshHandler,
  StorageKeys,
} from '@/shared/config'
import { parseBackendError } from '@/shared/lib'

import { currentUserStore } from './currentUserStore'

export class AuthStore {
  loading = false
  error: string | null = null
  accessToken: string | null = localStorage.getItem(StorageKeys.Auth.AccessToken)
  refreshToken: string | null = localStorage.getItem(
    StorageKeys.Auth.RefreshToken,
  )

  constructor() {
    makeAutoObservable(this, {
      login: false,
      refresh: false,
      setupAuthRefreshHandler: false,
    })
  }

  get isAuthenticated(): boolean {
    return Boolean(this.accessToken)
  }

  login = async (username: string, password: string): Promise<void> => {
    this.startLoading()
    try {
      const response = await authApi.login({ username, password })
      this.setTokens(response.data.accessToken, response.data.refreshToken)
    } catch (err) {
      this.setLoginError(parseBackendError(err))
    } finally {
      this.finishLoading()
    }
  }

  logout = (): void => {
    this.clearTokens()
    currentUserStore.clearUser()
  }

  setTokens = (accessToken: string, refreshToken: string): void => {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    localStorage.setItem(StorageKeys.Auth.AccessToken, accessToken)
    localStorage.setItem(StorageKeys.Auth.RefreshToken, refreshToken)
  }

  refresh = async (): Promise<void> => {
    if (!this.refreshToken) {
      throw new Error('No refresh token')
    }
    const response = await authApi.refresh(this.refreshToken)

    this.setTokens(response.data.accessToken, response.data.refreshToken)
  }

  setupAuthRefreshHandler = (): void => {
    setAuthErrorHandler(() => this.logout())
    setAuthRefreshHandler((config) => this.tryRefreshOrLogout(config))
  }

  private tryRefreshOrLogout = async (
    config: InternalAxiosRequestConfig,
  ): Promise<boolean> => {
    const isRefreshEndpoint = config.url?.includes(ApiRoutes.Auth.Refresh)
    if (isRefreshEndpoint || !this.refreshToken) {
      this.logout()
      return false
    }
    return this.refreshOnce()
  }

  private refreshOnce = async (): Promise<boolean> => {
    if (this.pendingRefresh) {
      return this.pendingRefresh
    }
    this.pendingRefresh = this.refresh()
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        runInAction(() => {
          this.pendingRefresh = null
        })
      })
    return this.pendingRefresh
  }

  private pendingRefresh: Promise<boolean> | null = null

  private startLoading = (): void => {
    this.loading = true
    this.error = null
  }

  private finishLoading = (): void => {
    this.loading = false
  }

  private setLoginError = (message: string): void => {
    this.error = message
  }

  private clearTokens = (): void => {
    this.accessToken = null
    this.refreshToken = null
    this.error = null
    localStorage.removeItem(StorageKeys.Auth.AccessToken)
    localStorage.removeItem(StorageKeys.Auth.RefreshToken)
  }
}

export const authStore = new AuthStore()
