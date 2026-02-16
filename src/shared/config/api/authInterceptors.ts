import type { AxiosError, AxiosInstance } from 'axios'

import type { AuthRefreshHandler } from './types'

let authRefreshHandler: AuthRefreshHandler | null = null
let authErrorHandler: (() => void) | null = null

export const setAuthRefreshHandler = (handler: AuthRefreshHandler): void => {
  authRefreshHandler = handler
}

export const setAuthErrorHandler = (handler: () => void): void => {
  authErrorHandler = handler
}

function onAuthError(): void {
  authErrorHandler?.()
}

export const attachAuthResponseInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config
      const is401 = error.response?.status === 401

      if (!config || !is401) {
        onAuthError()
        return Promise.reject(error)
      }

      if (!authRefreshHandler) {
        onAuthError()
        return Promise.reject(error)
      }

      const refreshed = await authRefreshHandler(config)
      if (!refreshed) {
        onAuthError()
        return Promise.reject(error)
      }

      return client.request(config)
    },
  )
}
