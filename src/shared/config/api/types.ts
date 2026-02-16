import type { InternalAxiosRequestConfig } from 'axios'

export type AuthRefreshHandler = (
  config: InternalAxiosRequestConfig,
) => Promise<boolean>
