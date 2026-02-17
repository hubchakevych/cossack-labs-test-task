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

import { HOME_PRODUCTS_QUERY_PARAMS } from './constants'
import { buildProductsSearchParams, parseProductsQueryParams } from './utils'

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

  const queryParams = useMemo<ProductsTableQueryParams>(
    () => parseProductsQueryParams(searchParams),
    [searchParams],
  )

  const setParams = useCallback((next: ProductsTableQueryParams) => {
    setSearchParams(buildProductsSearchParams(next))
  }, [setSearchParams])

  useEffect(() => {
    if (
      !searchParams.has(HOME_PRODUCTS_QUERY_PARAMS.take)
      || !searchParams.has(HOME_PRODUCTS_QUERY_PARAMS.skip)
    ) {
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
