import type { ProductSortBy } from './types'

export const DEFAULT_PRODUCTS_TAKE = 20

export const PRODUCTS_SORT_FIELDS: Record<ProductSortBy, string> = {
  title: 'Title',
  price: 'Price',
  stock: 'Stock',
  rating: 'Rating',
}
