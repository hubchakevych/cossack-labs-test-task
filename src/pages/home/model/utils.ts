import type {
  ProductSortBy,
  ProductsTableQueryParams,
  SortOrder,
} from '@/entities/product/model/types'

import {
  DEFAULT_PRODUCTS_SKIP,
  DEFAULT_PRODUCTS_TAKE,
  HOME_PRODUCTS_QUERY_PARAMS,
  HOME_PRODUCTS_SORT_FIELDS,
  HOME_PRODUCTS_SORT_ORDERS,
} from './constants'

const parseNumberParam = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const parseSortField = (value: string | null): ProductSortBy | undefined => {
  if (!value) {
    return undefined
  }

  return HOME_PRODUCTS_SORT_FIELDS.includes(value as ProductSortBy)
    ? (value as ProductSortBy)
    : undefined
}

const parseSortOrder = (value: string | null): SortOrder | undefined => {
  if (!value) {
    return undefined
  }

  return HOME_PRODUCTS_SORT_ORDERS.includes(value as SortOrder)
    ? (value as SortOrder)
    : undefined
}

export const parseProductsQueryParams = (
  searchParams: URLSearchParams,
): ProductsTableQueryParams => ({
  searchTerm: searchParams.get(HOME_PRODUCTS_QUERY_PARAMS.searchTerm) || undefined,
  category: searchParams.get(HOME_PRODUCTS_QUERY_PARAMS.category) || undefined,
  sortBy: parseSortField(searchParams.get(HOME_PRODUCTS_QUERY_PARAMS.sortBy)),
  order: parseSortOrder(searchParams.get(HOME_PRODUCTS_QUERY_PARAMS.order)),
  take: parseNumberParam(searchParams.get(HOME_PRODUCTS_QUERY_PARAMS.take), DEFAULT_PRODUCTS_TAKE),
  skip: parseNumberParam(searchParams.get(HOME_PRODUCTS_QUERY_PARAMS.skip), DEFAULT_PRODUCTS_SKIP),
})

export const buildProductsSearchParams = (
  queryParams: ProductsTableQueryParams,
): URLSearchParams => {
  const nextSearchParams = new URLSearchParams()

  if (queryParams.searchTerm) {
    nextSearchParams.set(HOME_PRODUCTS_QUERY_PARAMS.searchTerm, queryParams.searchTerm)
  }
  if (queryParams.category) {
    nextSearchParams.set(HOME_PRODUCTS_QUERY_PARAMS.category, queryParams.category)
  }
  if (queryParams.sortBy) {
    nextSearchParams.set(HOME_PRODUCTS_QUERY_PARAMS.sortBy, queryParams.sortBy)
  }
  if (queryParams.order) {
    nextSearchParams.set(HOME_PRODUCTS_QUERY_PARAMS.order, queryParams.order)
  }

  nextSearchParams.set(HOME_PRODUCTS_QUERY_PARAMS.take, String(queryParams.take))
  nextSearchParams.set(HOME_PRODUCTS_QUERY_PARAMS.skip, String(queryParams.skip))

  return nextSearchParams
}
