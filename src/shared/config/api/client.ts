import axios from 'axios'

import { StorageKeys } from '../storage'
import { attachAuthResponseInterceptor } from './authInterceptors'

export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageKeys.Auth.AccessToken)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

attachAuthResponseInterceptor(apiClient)
