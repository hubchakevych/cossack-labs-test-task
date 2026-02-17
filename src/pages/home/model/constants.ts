import type { ProductSortBy } from '@/entities/product/model/types'
import { SortOrder } from '@/entities/product/model/types'

export const HOME_PRODUCTS_QUERY_PARAMS = {
  searchTerm: 'q',
  category: 'category',
  sortBy: 'sortBy',
  order: 'order',
  take: 'take',
  skip: 'skip',
} as const

export const HOME_PRODUCTS_SORT_FIELDS: ProductSortBy[] = [
  'title',
  'price',
  'stock',
  'rating',
]

export const HOME_PRODUCTS_SORT_ORDERS: SortOrder[] = [
  SortOrder.ASC,
  SortOrder.DESC,
]

export const DEFAULT_PRODUCTS_TAKE: number = 20
export const DEFAULT_PRODUCTS_SKIP: number = 0
