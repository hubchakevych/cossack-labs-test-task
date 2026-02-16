import { apiClient, ApiRoutes } from '@/shared/config'

import type {
  ProductsResponse,
} from '../model/types'

export const productApi = {
  getAll: ({ limit, skip }: { limit: number; skip: number }) =>
    apiClient.get<ProductsResponse>(ApiRoutes.Products, { params: { limit, skip } }),
}
