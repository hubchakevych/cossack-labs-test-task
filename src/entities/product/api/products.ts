import { apiClient, ApiRoutes } from '@/shared/config'

import type {
  ProductCategory,
  ProductSortBy,
  ProductsResponse,
  SortOrder,
} from '../model/types'

type ProductsListParams = {
  limit: number
  skip: number
  sortBy?: ProductSortBy
  order?: SortOrder
}

export const productApi = {
  getAll: (params: ProductsListParams) =>
    apiClient.get<ProductsResponse>(ApiRoutes.Products, { params }),

  search: ({ searchTerm, ...params }: ProductsListParams & { searchTerm: string }) =>
    apiClient.get<ProductsResponse>(ApiRoutes.ProductsSearch, {
      params: { q: searchTerm, ...params },
    }),

  getByCategory: ({ category, ...params }: ProductsListParams & { category: string }) =>
    apiClient.get<ProductsResponse>(`${ApiRoutes.ProductsByCategory}/${category}`, {
      params,
    }),

  getCategories: () =>
    apiClient.get<ProductCategory[]>(ApiRoutes.ProductsCategories),
}
