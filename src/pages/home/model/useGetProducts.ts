import { useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { productsStore } from '@/app/store/productsStore'
import { DEFAULT_PRODUCTS_TAKE } from '@/entities/product/model/constants'
import type {
  Product,
  ProductSortBy,
  ProductsTableQueryParams,
} from '@/entities/product/model/types'
import { SortOrder } from '@/entities/product/model/types'

const SORT_FIELDS: ProductSortBy[] = ['title', 'price', 'stock', 'rating']

const SORT_ORDERS: SortOrder[] = [SortOrder.ASC, SortOrder.DESC]
const SEARCH_QUERY_PARAM = 'q'

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
  return SORT_FIELDS.includes(value as ProductSortBy)
    ? (value as ProductSortBy)
    : undefined
}

const parseSortOrder = (value: string | null): SortOrder | undefined => {
  if (!value) {
    return undefined
  }
  return SORT_ORDERS.includes(value as SortOrder)
    ? (value as SortOrder)
    : undefined
}

type UseGetProductsResult = {
  products: Product[]
  loading: boolean
  error: string | null
  total: number
  params: ProductsTableQueryParams
  updateFilters: (patch: Partial<ProductsTableQueryParams>) => void
  updateSort: (field: ProductSortBy) => void
  loadMore: () => void
  hasMore: boolean
}

export const useGetProducts = (): UseGetProductsResult => {
  const { products, loading, error, total, getProducts } = productsStore
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParams = useMemo<ProductsTableQueryParams>(() => ({
    searchTerm: searchParams.get(SEARCH_QUERY_PARAM) || undefined,
    category: searchParams.get('category') || undefined,
    sortBy: parseSortField(searchParams.get('sortBy')),
    order: parseSortOrder(searchParams.get('order')),
    take: parseNumberParam(searchParams.get('take'), DEFAULT_PRODUCTS_TAKE),
    skip: parseNumberParam(searchParams.get('skip'), 0),
  }), [searchParams])

  const setParams = useCallback((next: ProductsTableQueryParams) => {
    const nextSearchParams = new URLSearchParams()

    if (next.searchTerm) {
      nextSearchParams.set(SEARCH_QUERY_PARAM, next.searchTerm)
    }
    if (next.category) {
      nextSearchParams.set('category', next.category)
    }
    if (next.sortBy) {
      nextSearchParams.set('sortBy', next.sortBy)
    }
    if (next.order) {
      nextSearchParams.set('order', next.order)
    }
    nextSearchParams.set('take', String(next.take))
    nextSearchParams.set('skip', String(next.skip))

    setSearchParams(nextSearchParams)
  }, [setSearchParams])

  useEffect(() => {
    if (!searchParams.has('take') || !searchParams.has('skip')) {
      setParams(queryParams)
    }
  }, [queryParams, searchParams, setParams])

  const updateFilters = useCallback((patch: Partial<ProductsTableQueryParams>) => {
    setParams({
      ...queryParams,
      ...patch,
      skip: 0,
    })
  }, [queryParams, setParams])

  const loadMore = useCallback(() => {
    setParams({
      ...queryParams,
      take: queryParams.take + DEFAULT_PRODUCTS_TAKE,
    })
  }, [queryParams, setParams])

  const updateSort = useCallback((field: ProductSortBy) => {
    const isSameField = queryParams.sortBy === field
    const nextOrder: SortOrder = isSameField
      ? (queryParams.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC)
      : SortOrder.ASC

    updateFilters({
      sortBy: field,
      order: nextOrder,
    })
  }, [queryParams.order, queryParams.sortBy, updateFilters])

  useEffect(() => {
    void getProducts(queryParams)
  }, [getProducts, queryParams])

  return {
    products,
    loading,
    error,
    total,
    params: queryParams,
    updateFilters,
    updateSort,
    loadMore,
    hasMore: queryParams.skip + products.length < total,
  }
}
