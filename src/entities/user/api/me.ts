import type { AuthUser } from '@/shared/api/auth/types'
import { apiClient, ApiRoutes } from '@/shared/config'

export const userApi = {
  getMe: () => apiClient.get<AuthUser>(ApiRoutes.Auth.Me),
}
