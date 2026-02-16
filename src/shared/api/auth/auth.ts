import { apiClient, ApiRoutes } from '@/shared/config'

import { LoginParams, LoginResponse, RefreshResponse } from './types'

export const authApi = {
  login: (params: LoginParams) =>
    apiClient.post<LoginResponse>(ApiRoutes.Auth.Login, params),

  refresh: (refreshToken: string) =>
    apiClient.post<RefreshResponse>(ApiRoutes.Auth.Refresh, { refreshToken }),
}
