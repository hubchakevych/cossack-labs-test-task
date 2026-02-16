import type { AuthUser } from '@/shared/api'
import { apiClient } from '@/shared/config'

export const userApi = {
  getMe: () => apiClient.get<AuthUser>('/user/me'),
}
