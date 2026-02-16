import { apiClient } from '@/shared/config'

import type { ProductsResponse } from '../model/types'

export const productApi = {
  getAll: (params?: { limit?: number; skip?: number }) =>
    apiClient.get<ProductsResponse>('/products', { params }),
}
