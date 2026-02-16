import { apiClient } from '@/shared/config'

export type AuthUser = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export type LoginResponse = AuthUser & {
  accessToken: string
  refreshToken: string
}

export type LoginParams = {
  username: string
  password: string
}

export const authApi = {
  login: (params: LoginParams) =>
    apiClient.post<LoginResponse>('/auth/login', params),
}
