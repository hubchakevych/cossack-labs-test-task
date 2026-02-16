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

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}
